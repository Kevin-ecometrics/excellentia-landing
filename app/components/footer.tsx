'use client'

import { useActionState } from 'react'
import type { ContactFormState } from '@/app/lib/actions'

const initialState: ContactFormState = { status: 'idle', message: '' }

// Temporarily disabled while SMTP delivery for contacto@excellentiafoods.com is being fixed.
// The real Server Action (subscribeContactEmail) is only imported as a type here because
// static export (next.config.ts output: "export") fails the build if any Server Action is
// reachable from a client component, even if unused. Restore the runtime import and swap it
// back into useActionState below once SMTP delivery is fixed and this flag is re-enabled.
const REGISTRATION_ENABLED = false

async function disabledFormAction(
  _prevState: ContactFormState,
  _formData: FormData
): Promise<ContactFormState> {
  return initialState
}

export default function Footer() {
  const [state, formAction, pending] = useActionState(
    disabledFormAction,
    initialState
  )

  return (
    <footer
      id="contact"
      className="flex h-[60vh] w-full flex-col justify-between gap-16 bg-default-navy px-6 pt-16 text-default-ivory sm:pt-20 lg:h-[70vh] pb-2"
    >
      <div className="flex w-full flex-col items-start gap-8 sm:flex-row sm:justify-between">
        <div className="w-full sm:max-w-md">
          <h3 className="font-support2 text-2xl font-bold sm:text-3xl">
            Request wholesale catalog and price list!
          </h3>
          <form action={formAction} className="mt-6">
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute -left-256 opacity-0"
            />
            <div className="flex items-center gap-4 border-b border-default-ivory/30 pb-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={!REGISTRATION_ENABLED || pending}
                className="w-full bg-transparent font-support2 text-base text-default-ivory placeholder:text-default-ivory/50 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                aria-label="Submit email"
                disabled={!REGISTRATION_ENABLED || pending}
                className="flex-none text-default-ivory transition-transform hover:translate-x-1 disabled:opacity-50"
              >
                <span aria-hidden="true">{pending ? '···' : '→'}</span>
              </button>
            </div>
            {REGISTRATION_ENABLED && state.message && (
              <p
                role="status"
                className={`mt-2 text-sm ${
                  state.status === 'error'
                    ? 'text-default-rust'
                    : 'text-default-ivory/80'
                }`}
              >
                {state.message}
              </p>
            )}
          </form>
        </div>

        <nav className="hidden flex-none flex-col items-end gap-2 font-support2 text-base font-bold sm:flex">
          <span aria-disabled="true" className="cursor-pointer hover:underline">
            About
          </span>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>

      <div className="flex w-full flex-col gap-2 text-sm text-default-ivory/70">
        <div className="flex w-full justify-between sm:hidden">
          <nav className="flex flex-col items-start gap-2 font-support2 text-base font-bold text-default-ivory">
            <span
              aria-disabled="true"
              className="cursor-pointer hover:underline"
            >
              About
            </span>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
          <div className="flex flex-col items-start gap-2">
            <a
              href="/End-User-Licensing-Agreement"
              className="underline-offset-2 hover:underline"
            >
              End-User Licensing Agreement
            </a>
            <a
              href="/privacy-policy"
              className="underline-offset-2 hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="hidden justify-start gap-4 sm:flex">
          <a
            href="/End-User-Licensing-Agreement"
            className="underline-offset-2 hover:underline"
          >
            End-User Licensing Agreement
          </a>
          <a
            href="/privacy-policy"
            className="underline-offset-2 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
        <div className="border-t border-default-ivory/20 pt-2 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Excellentia Foods LLC</span>
        </div>
      </div>
    </footer>
  );
}
