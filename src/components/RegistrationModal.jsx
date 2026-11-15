import { useEffect, useRef, useState } from 'react';
import { EMAIL_DOMAIN, INTERESTS, YEARS, validateRegistration } from '../../shared/formOptions.js';
import { submitRegistration } from '../lib/api.js';
import WhatsAppBlock from './WhatsAppBlock.jsx';

const LABELS = {
  fullName: 'Full Name', rollNumber: 'University Roll Number', courseBranch: 'Course and Branch', currentYear: 'Current Year',
  whatsapp: 'WhatsApp Number', email: 'Official University Email ID', interests: 'Interests', agreeWhatsapp: 'WhatsApp group confirmation',
};
const ORDER = Object.keys(LABELS);
const toItems = (errs) => ORDER.filter((k) => errs[k]).map((k) => ({ name: k, label: LABELS[k], msg: errs[k] }));

const EMPTY = { fullName: '', rollNumber: '', courseBranch: '', currentYear: '', whatsapp: '', email: '', interests: [], agreeWhatsapp: false, website: '' };

function Field({ id, label, required = true, hint, error, children }) {
  return (
    <div className={'fld' + (error ? ' has-err' : '')}>
      <label htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </label>
      {hint && <p className="hint" id={id + '-h'}>{hint}</p>}
      {children}
      {error && <p className="err" id={id + '-e'} role="alert">{error}</p>}
    </div>
  );
}

export default function RegistrationModal({ onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [banner, setBanner] = useState(null);   // { kind: 'duplicate' | 'error', title, text }
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const boxRef = useRef(null);
  const scrollerRef = useRef(null);
  const formRef = useRef(null);
  const lastFocus = useRef(document.activeElement);
  const busy = status === 'submitting';

  // lock page scroll, trap focus, close on Escape, restore focus on close
  useEffect(() => {
    document.body.classList.add('lock');
    boxRef.current?.focus();
    const prev = lastFocus.current;
    const onKey = (e) => {
      if (e.key === 'Escape' && !busy) onClose();
      if (e.key === 'Tab' && boxRef.current) {
        const f = [...boxRef.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([tabindex="-1"]),select,textarea')].filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === boxRef.current)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('lock');
      prev && prev.focus && prev.focus();
    };
  }, [busy, onClose]);

  // after a successful submit, bring the confirmation to the top of the screen
  useEffect(() => {
    if (status === 'success') { scrollerRef.current && (scrollerRef.current.scrollTop = 0); boxRef.current && boxRef.current.focus(); }
  }, [status]);

  const focusFirstError = () => setTimeout(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus(), 30);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
    if (banner && banner.kind === 'duplicate') setBanner(null);
  };
  const onBlurField = (name) => {
    if (name === 'agreeWhatsapp') return;
    const msg = validateRegistration(values).errors[name];
    setErrors((e) => { const n = { ...e }; if (msg && values[name] !== '') n[name] = msg; else delete n[name]; return n; });
  };

  const toggleInterest = (item) =>
    setField('interests', values.interests.includes(item) ? values.interests.filter((x) => x !== item) : [...values.interests, item]);

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    setBanner(null);
    const { errors: clientErrors } = validateRegistration(values);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      const items = toItems(clientErrors);
      setBanner({ kind: 'error', title: `${items.length} ${items.length === 1 ? 'thing needs' : 'things need'} fixing`, items });
      focusFirstError();
      return;
    }
    setStatus('submitting');
    const res = await submitRegistration(values);
    if (res.status === 'registered') { setResult(res); setStatus('success'); return; }
    setStatus('idle');
    if (res.status === 'already_registered') {
      setErrors({ [res.field]: `This ${LABELS[res.field]} is already registered.` });
      setBanner({ kind: 'duplicate', title: 'Already registered', text: res.message });
      focusFirstError();
    } else if (res.status === 'validation_error') {
      const items = toItems(res.errors || {});
      setErrors(res.errors || {});
      setBanner(items.length
        ? { kind: 'error', title: `${items.length} ${items.length === 1 ? 'thing needs' : 'things need'} fixing`, items }
        : { kind: 'error', title: 'Could not submit', text: res.message });
      focusFirstError();
    } else if (res.status === 'closed') {
      setBanner({ kind: 'error', title: 'Registrations closed', text: res.message });
    } else if (res.status === 'rate_limited') {
      setBanner({ kind: 'error', title: 'Too many attempts', text: res.message });
    } else if (res.status === 'network_error') {
      setBanner({ kind: 'error', title: 'No connection', text: res.message });
    } else {
      setBanner({ kind: 'error', title: 'Something went wrong', text: res.message || 'Please try again in a moment.' });
    }
  }

  const copyId = async () => {
    try { await navigator.clipboard.writeText(result.registrationId); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };

  const a11y = (name) => ({
    id: 'rf-' + name,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': [errors[name] ? `rf-${name}-e` : '', `rf-${name}-h`].filter(Boolean).join(' ') || undefined,
    onBlur: () => onBlurField(name),
  });

  return (
    <div className="rmodal" ref={scrollerRef} onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}>
      <div className="rbox" role="dialog" aria-modal="true" aria-labelledby="rf-title" tabIndex={-1} ref={boxRef}>
        <button type="button" className="rclose" onClick={onClose} disabled={busy} aria-label="Close registration form">✕</button>

        {status === 'success' ? (
          <div className="rsuccess" role="status">
            <div className="tick" aria-hidden="true">✓</div>
            <h2 id="rf-title" className="disp">Registered successfully!</h2>
            <p>You're in, <b>{result.data.fullName.split(' ')[0]}</b>. See you at Artopia 3.0.</p>
            <div className="rid">
              <span>Your registration ID</span>
              <b>{result.registrationId}</b>
              <button type="button" className="btn btn-ghost btn-sm" onClick={copyId}>{copied ? 'Copied ✓' : 'Copy ID'}</button>
            </div>
            <p className="small">Please save this ID and keep your University Roll Number handy on the event day.</p>
            <WhatsAppBlock />
            <button type="button" className="btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <p className="tag">ARTOPIA 3.0 · REGISTRATION</p>
            <h2 id="rf-title" className="disp rtitle">Enter the multiverse</h2>
            <p className="small">Fields marked <span className="req">*</span> are required.</p>

            {banner && (
              <div className={'banner ' + banner.kind} role="alert">
                <b>{banner.title}</b>
                {banner.text && <span>{banner.text}</span>}
                {banner.items && (
                  <ul className="problems">
                    {banner.items.map((it) => (
                      <li key={it.name}>
                        <button type="button" onClick={() => document.getElementById('rf-' + it.name)?.focus()}>
                          <strong>{it.label}:</strong> {it.msg}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <Field id="rf-fullName" label="Full Name" error={errors.fullName}>
              <input {...a11y('fullName')} type="text" name="fullName" autoComplete="name" maxLength={80} value={values.fullName} onChange={(e) => setField('fullName', e.target.value)} placeholder="Your full name" />
            </Field>

            <Field id="rf-rollNumber" label="University Roll Number" hint="Please enter accurately" error={errors.rollNumber}>
              <input {...a11y('rollNumber')} type="text" name="rollNumber" autoComplete="off" autoCapitalize="characters" maxLength={20} value={values.rollNumber} onChange={(e) => setField('rollNumber', e.target.value)} placeholder="Your university roll no" />
            </Field>

            <Field id="rf-courseBranch" label="Course and Branch" error={errors.courseBranch}>
              <input {...a11y('courseBranch')} type="text" name="courseBranch" autoComplete="off" maxLength={60} value={values.courseBranch} onChange={(e) => setField('courseBranch', e.target.value)} placeholder="Course and branch" />
            </Field>

            <Field id="rf-currentYear" label="Current Year" error={errors.currentYear}>
              <select {...a11y('currentYear')} name="currentYear" value={values.currentYear} onChange={(e) => setField('currentYear', e.target.value)}>
                <option value="">Select your year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </Field>

            <Field id="rf-whatsapp" label="WhatsApp Number" hint="For quick communication regarding the event" error={errors.whatsapp}>
              <input {...a11y('whatsapp')} type="tel" name="whatsapp" inputMode="tel" autoComplete="tel-national" maxLength={16} value={values.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} placeholder="10-digit mobile number" />
            </Field>

            <Field id="rf-email" label="Official University Email ID" hint={EMAIL_DOMAIN ? `e.g., your_name@${EMAIL_DOMAIN}` : 'e.g., your_name@college.ac.in'} error={errors.email}>
              <input {...a11y('email')} type="email" name="email" autoComplete="email" maxLength={120} value={values.email} onChange={(e) => setField('email', e.target.value)} placeholder={EMAIL_DOMAIN ? `your_name@${EMAIL_DOMAIN}` : 'your_name@college.ac.in'} />
            </Field>

            <fieldset className="fld interests">
              <legend>Which universes interest you? <span className="opt">(optional)</span></legend>
              <div className="chips">
                {INTERESTS.map((it) => (
                  <label key={it} className={'chip' + (values.interests.includes(it) ? ' on' : '')}>
                    <input type="checkbox" checked={values.interests.includes(it)} onChange={() => toggleInterest(it)} />
                    <span>{it}</span>
                  </label>
                ))}
              </div>
              {errors.interests && <p className="err" role="alert">{errors.interests}</p>}
            </fieldset>

            <WhatsAppBlock />
            <div className={'fld' + (errors.agreeWhatsapp ? ' has-err' : '')}>
              <label className="agree" htmlFor="rf-agreeWhatsapp">
                <input
                  id="rf-agreeWhatsapp" type="checkbox" checked={values.agreeWhatsapp}
                  aria-invalid={errors.agreeWhatsapp ? 'true' : undefined}
                  aria-describedby={errors.agreeWhatsapp ? 'rf-agreeWhatsapp-e' : undefined}
                  onChange={(e) => setField('agreeWhatsapp', e.target.checked)}
                />
                <span>I understand I must join the Artopia 3.0 WhatsApp group for event updates. <span className="req" aria-hidden="true">*</span></span>
              </label>
              {errors.agreeWhatsapp && <p className="err" id="rf-agreeWhatsapp-e" role="alert">{errors.agreeWhatsapp}</p>}
            </div>

            {/* honeypot: hidden from people, bots fill it in */}
            <div className="hp" aria-hidden="true">
              <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => setField('website', e.target.value)} /></label>
            </div>

            <button type="submit" className="btn rsubmit" disabled={busy}>
              {busy ? (<><span className="spin" aria-hidden="true" /> Registering…</>) : 'Submit registration ↗'}
            </button>
            <p className="small center">Your details are used only for Artopia 3.0 communication.</p>
          </form>
        )}
      </div>
    </div>
  );
}
