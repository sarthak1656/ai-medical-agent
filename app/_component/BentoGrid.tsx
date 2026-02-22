import { Smartphone, Zap, ShieldCheck, Terminal } from "lucide-react";

export const BentoGrid = () => {
  return (
    <section className="mt-32 w-full py-10">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-emerald-600">Healthcare Excellence</h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl dark:text-white">
          Built for modern medicine
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          
          {/* Feature 1: Mobile Friendly */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-neutral-900 lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="h-5 w-5 text-emerald-600" />
                  <p className="text-lg font-medium tracking-tight text-gray-950 dark:text-white">Patient Mobile App</p>
                </div>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-neutral-400">
                  Patients can record symptoms and chat with the AI agent on the go.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    alt="Mobile UI"
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>

          {/* Feature 2: Performance */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-neutral-900 max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-emerald-600" />
                  <p className="text-lg font-medium tracking-tight text-gray-950 dark:text-white">Real-time Analysis</p>
                </div>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-neutral-400">
                  Low-latency voice processing for instant medical terminology recognition.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt="Performance"
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                  className="w-full max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>

          {/* Feature 3: Security */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-neutral-900" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <p className="text-lg font-medium tracking-tight text-gray-950 dark:text-white">HIPAA Compliant</p>
                </div>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-neutral-400">
                  Enterprise-grade encryption protecting sensitive patient data.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  alt="Security"
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* Feature 4: Powerful APIs */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-neutral-900 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-5 w-5 text-emerald-600" />
                  <p className="text-lg font-medium tracking-tight text-gray-950 dark:text-white">EMR Integration</p>
                </div>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-neutral-400">
                  Sync consultations directly with professional medical record systems.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10">
                  <div className="flex bg-gray-900 outline outline-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                        PatientReport.jsx
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 text-xs font-mono text-emerald-400">
                    <code>{`// Syncing voice data...`}</code><br/>
                    <code>{`const syncReport = async (data) => {`}</code><br/>
                    <code>{`  await EMR.push(data.transcript);`}</code><br/>
                    <code>{`}`}</code>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </section>
  );
};