import React, { useMemo, useState } from "react";

const DONOR_PHONE = "932279911";
const DONOR_PHONE_DISPLAY = "932 279 911";
const HOSPITAL_LOGO = "data:image/webp;base64,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";

const initialData = {
  step1: {
    riskSheet: false,
    consent: false,
    signatures: false,
    photocopies: false,
    hasYesRisk: "",
    expandedFamilyInfo: false,
  },
  step2: {
    exitusReport: false,
    deathCertificate: false,
  },
  step3: {
    donorNumber: "",
    donorCenterContacted: false,
    donorNumberConfirmed: false,
  },
  step4: {
    protocolFilled: false,
    antibioticsRegistered: false,
    culturesRegistered: false,
    copyKept: false,
  },
  step5: {
    riskOriginal: false,
    consentOriginal: false,
    protocolOriginal: false,
  },
  step6: {
    copiesDone: false,
    folderArchived: false,
    xhis: false,
    excel: false,
    trello: false,
  },
};

const documents = {
  risk: {
    title: "Riscos biològics",
    subtitle: "Hoja de evaluación del riesgo biológico",
    help: "Completar todas las preguntas con la familia. Si alguna respuesta es SÍ, ampliar información para comunicarlo al Donor Center.",
    file: "/riscos.png",
  },
  consent: {
    title: "Consentiment informat",
    subtitle: "Diligencia de voluntad de donación",
    help: "Debe estar firmado por los declarantes mayores de edad. Revisar datos del difunto y relación con el declarante.",
  },
  protocol: {
    title: "Protocol de selecció del donant de teixits",
    subtitle: "Documento para entregar al extractor",
    help: "Rellenar con los datos disponibles. Muy importante: ANTIBIÒTICS y CULTIUS DURANT L'INGRÉS. La Exploració Física no es necesaria.",
  },
};

function CheckItem({ checked, onChange, children }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={
        "w-full flex gap-3 items-start rounded-2xl border p-4 text-left transition " +
        (checked
          ? "border-emerald-400 bg-emerald-50"
          : "border-slate-200 bg-white hover:bg-slate-50")
      }
    >
      <span
        className={
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-sm font-black " +
          (checked
            ? "border-emerald-600 bg-emerald-600 text-white"
            : "border-slate-300 bg-white text-white")
        }
      >
        ✓
      </span>
      <span className="text-sm font-semibold text-slate-800">{children}</span>
    </button>
  );
}

function Header({ step, title, subtitle, icon }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
        {icon}
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-emerald-700">Pas {step} de 7</div>
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function HelpBox({ children, tone = "blue" }) {
  const styles = {
    blue: "border-sky-200 bg-sky-50 text-sky-950",
    amber: "border-amber-200 bg-amber-50 text-amber-950",
    red: "border-red-200 bg-red-50 text-red-950",
    green: "border-emerald-200 bg-emerald-50 text-emerald-950",
  };
  return <div className={`rounded-2xl border p-4 text-sm leading-relaxed ${styles[tone]}`}>{children}</div>;
}

function DocumentImage({ doc, variant = "preview" }) {
  const [hasError, setHasError] = useState(false);

  if (!doc.file || hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
        Imatge del document no carregada. Revisa que el fitxer estigui a public/riscos.png
      </div>
    );
  }

  return (
    <img
      src={doc.file}
      alt={doc.title}
      onError={() => setHasError(true)}
      className={
        variant === "modal"
          ? "w-full h-auto rounded-xl border bg-white"
          : "h-full w-full object-contain rounded-xl border border-slate-200 bg-white"
      }
    />
  );
}

function DocumentPreview({ doc, onOpen }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-2xl">📄</div>
        <div className="min-w-0">
          <h3 className="truncate font-black text-slate-900">{doc.title}</h3>
          <p className="text-xs text-slate-500">{doc.subtitle}</p>
        </div>
      </div>
      <div className="flex h-72 items-center justify-center bg-white p-3">
        {doc.file ? (
          <DocumentImage doc={doc} />
        ) : (
          <div className="h-48 w-36 rounded-xl border border-slate-300 bg-gradient-to-br from-white to-slate-100 p-3 shadow-sm">
            <div className="mb-4 h-3 w-24 rounded bg-slate-300" />
            <div className="space-y-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-2 rounded bg-slate-200" style={{ width: `${90 - (i % 3) * 14}%` }} />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="h-5 rounded border border-slate-300" />
              <div className="h-5 rounded border border-slate-300" />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        <button onClick={onOpen} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700">🔍 Veure en gran</button>
        <button onClick={onOpen} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700">❔ Què cal omplir</button>
      </div>
    </div>
  );
}

function Modal({ doc, onClose }) {
  if (!doc) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[86vh] w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="font-black text-slate-950">{doc.title}</h3>
            <p className="text-xs text-slate-500">Guia visual del document</p>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">×</button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-5">
          <div className="mb-4 rounded-2xl border bg-slate-50 p-3">
            {doc.file ? (
              <DocumentImage doc={doc} variant="modal" />
            ) : (
              <div className="flex aspect-[3/4] items-center justify-center rounded-xl border bg-white p-6 text-center text-sm text-slate-400 shadow-sm">
                Aquí es mostrarà el document
              </div>
            )}
          </div>

          <HelpBox>{doc.help}</HelpBox>
        </div>
      </div>
    </div>
  );
}

function Progress({ step }) {
  const percent = Math.round((step / 7) * 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] text-slate-100">
        <span>Pas {step} de 7</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
        <div className="h-full rounded-full bg-white transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function StickyCallButton({ urgent }) {
  return (
    <div className="sticky bottom-0 -mx-4 border-t border-slate-100 bg-gradient-to-t from-white via-white to-white/80 px-4 pb-4 pt-3">
      <a href={`tel:${DONOR_PHONE}`} className="block">
        <button className={`h-14 w-full rounded-2xl text-base font-black text-white shadow-lg ${urgent ? "bg-red-600" : "bg-emerald-700"}`}>
          ☎️ {urgent ? "Llamar Donor Center" : "Donor Center"} · {DONOR_PHONE_DISPLAY}
        </button>
      </a>
    </div>
  );
}

function RadioRisk({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["NO", "SÍ"].map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={
            "h-16 rounded-2xl border text-lg font-black transition " +
            (value === option
              ? option === "SÍ"
                ? "border-red-300 bg-red-50 text-red-800"
                : "border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border-slate-200 bg-white text-slate-600")
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [modalDoc, setModalDoc] = useState(null);

  const update = (group, key, value) => {
    setData((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [key]: value,
      },
    }));
  };

  const canNext = useMemo(() => {
    if (step === 1) {
      const s = data.step1;
      return s.riskSheet && s.consent && s.signatures && s.photocopies && s.hasYesRisk && (s.hasYesRisk === "NO" || s.expandedFamilyInfo);
    }
    if (step === 2) {
      const s = data.step2;
      return s.exitusReport || s.deathCertificate;
    }
    if (step === 3) {
      const s = data.step3;
      return s.donorCenterContacted && s.donorNumber.trim().length > 0 && s.donorNumberConfirmed;
    }
    if (step === 4) {
      const s = data.step4;
      return s.protocolFilled && s.antibioticsRegistered && s.culturesRegistered && s.copyKept;
    }
    if (step === 5) {
      const s = data.step5;
      return s.riskOriginal && s.consentOriginal && s.protocolOriginal;
    }
    if (step === 6) {
      const s = data.step6;
      return s.copiesDone && s.folderArchived && s.xhis && s.excel && s.trello;
    }
    return false;
  }, [data, step]);

  const reset = () => {
    setData(initialData);
    setStep(1);
  };

  return (
    <div className="min-h-[100dvh] bg-slate-100 px-0 py-0 sm:px-3 sm:py-6">
      <div className="mx-auto min-h-[100dvh] w-full max-w-md overflow-hidden rounded-none border-0 bg-white shadow-none sm:min-h-[92vh] sm:rounded-[2rem] sm:border sm:border-slate-200 sm:shadow-xl">
        <div className="px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 text-white" style={{ backgroundColor: "#afbd13" }}>
          <div className="mb-2 grid grid-cols-5 items-center gap-2">
            <div className="col-span-1 flex aspect-square items-center justify-center rounded-xl overflow-hidden">
              <img
                src={HOSPITAL_LOGO}
                alt="Fundació Hospital de l'Esperit Sant"
                className="h-full w-full object-contain scale-95"
              />
            </div>

            <div className="col-span-4 flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/25 text-2xl">👁️</div>
              <div className="min-w-0">
                <h1 className="text-[17px] font-black leading-tight">Donació de còrnies</h1>
                <p className="text-[12px] font-semibold text-white/95">Guia de procediment</p>
              </div>
            </div>
          </div>

          <Progress step={step} />
        </div>

        <div className="space-y-4 p-4 pb-0">
          {step === 1 && (
            <>
              <Header step={1} icon="🧾" title="Documentació amb la família" subtitle="Completa els documents reals amb la família." />
              <DocumentPreview doc={documents.risk} onOpen={() => setModalDoc(documents.risk)} />
              <DocumentPreview doc={documents.consent} onOpen={() => setModalDoc(documents.consent)} />

              <h3 className="pt-2 text-sm font-black uppercase tracking-wide text-slate-500">Checklist obligatori</h3>
              <CheckItem checked={data.step1.riskSheet} onChange={(v) => update("step1", "riskSheet", v)}>Full de Riscos Biològics omplert</CheckItem>
              <CheckItem checked={data.step1.consent} onChange={(v) => update("step1", "consent", v)}>Consentiment informat omplert</CheckItem>
              <CheckItem checked={data.step1.signatures} onChange={(v) => update("step1", "signatures", v)}>Signatures obtingudes</CheckItem>
              <CheckItem checked={data.step1.photocopies} onChange={(v) => update("step1", "photocopies", v)}>Fotocòpies realitzades</CheckItem>

              <h3 className="pt-2 text-sm font-black uppercase tracking-wide text-slate-500">Control de risc</h3>
              <p className="text-sm font-semibold text-slate-700">Alguna resposta al Full de Riscos Biològics és “SÍ”?</p>
              <RadioRisk value={data.step1.hasYesRisk} onChange={(v) => update("step1", "hasYesRisk", v)} />

              {data.step1.hasYesRisk === "SÍ" && (
                <>
                  <HelpBox tone="amber"><b>Acción obligatoria:</b> pide más información a la familia para poder comentarlo con Donor Center y confirmar la validez de la donación.</HelpBox>
                  <CheckItem checked={data.step1.expandedFamilyInfo} onChange={(v) => update("step1", "expandedFamilyInfo", v)}>Se ha ampliado la información con la familia</CheckItem>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <Header step={2} icon="📋" title="Còpia de document clínic" subtitle="Abans d'avisar l'extractor, confirma que hi ha una còpia preparada." />
              <HelpBox tone="amber"><b>Obligatorio:</b> hay que adjuntar una copia para cuando venga el extractor. Con uno de los dos documentos es suficiente.</HelpBox>
              <CheckItem checked={data.step2.exitusReport} onChange={(v) => update("step2", "exitusReport", v)}>Informe d'èxitus, còpia obtinguda</CheckItem>
              <CheckItem checked={data.step2.deathCertificate} onChange={(v) => update("step2", "deathCertificate", v)}>Certificat de defunció, còpia obtinguda</CheckItem>
            </>
          )}

          {step === 3 && (
            <>
              <div className="py-6 text-center">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-5xl">✅</div>
                <p className="font-black text-emerald-700">TOT CORRECTE</p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950">JA POTS AVISAR L'EXTRACTOR</h2>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                <p className="mb-2 text-sm font-black text-emerald-800">DONOR CENTER</p>
                <a href={`tel:${DONOR_PHONE}`} className="mb-4 block text-5xl font-black tracking-tight text-emerald-900">{DONOR_PHONE_DISPLAY}</a>
                <a href={`tel:${DONOR_PHONE}`} className="block">
                  <button className="h-14 w-full rounded-2xl bg-emerald-700 text-base font-black text-white">☎️ Trucar ara</button>
                </a>
              </div>

              <HelpBox tone="amber"><b>Durante la llamada:</b> solicita el <b>Número de donant</b> y registra el dato antes de continuar.</HelpBox>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Número de donant</span>
                <input
                  value={data.step3.donorNumber}
                  onChange={(event) => update("step3", "donorNumber", event.target.value)}
                  placeholder="Escriu el número de donant"
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-300 px-4 text-lg font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </label>

              <CheckItem checked={data.step3.donorCenterContacted} onChange={(v) => update("step3", "donorCenterContacted", v)}>He contactat amb el Donor Center</CheckItem>
              <CheckItem checked={data.step3.donorNumberConfirmed} onChange={(v) => update("step3", "donorNumberConfirmed", v)}>Número de donant registrado</CheckItem>
            </>
          )}

          {step === 4 && (
            <>
              <Header step={4} icon="📄" title="Protocol de selecció" subtitle="Documento para entregar al extractor y guardar copia." />
              <DocumentPreview doc={documents.protocol} onOpen={() => setModalDoc(documents.protocol)} />
              <HelpBox tone="red"><b>MUY IMPORTANTE:</b> completar la parte de <b>ANTIBIÒTICS</b> y <b>CULTIUS DURANT L'INGRÉS</b>. La parte de <b>Exploració Física</b> no es necesaria.</HelpBox>
              <CheckItem checked={data.step4.protocolFilled} onChange={(v) => update("step4", "protocolFilled", v)}>Document omplert amb les dades disponibles</CheckItem>
              <CheckItem checked={data.step4.antibioticsRegistered} onChange={(v) => update("step4", "antibioticsRegistered", v)}>Antibióticos durante el ingreso registrados</CheckItem>
              <CheckItem checked={data.step4.culturesRegistered} onChange={(v) => update("step4", "culturesRegistered", v)}>Cultivos durante el ingreso registrados</CheckItem>
              <CheckItem checked={data.step4.copyKept} onChange={(v) => update("step4", "copyKept", v)}>Copia preparada para el hospital</CheckItem>
            </>
          )}

          {step === 5 && (
            <>
              <Header step={5} icon="🤝" title="Entrega a l'extractor" subtitle="Verifica la entrega de documentación original." />
              <HelpBox tone="amber"><b>IMPORTANTE:</b> entregar los documentos originales al extractor.</HelpBox>
              <CheckItem checked={data.step5.riskOriginal} onChange={(v) => update("step5", "riskOriginal", v)}>Riscos biològics entregado</CheckItem>
              <CheckItem checked={data.step5.consentOriginal} onChange={(v) => update("step5", "consentOriginal", v)}>Consentiment informat entregado</CheckItem>
              <CheckItem checked={data.step5.protocolOriginal} onChange={(v) => update("step5", "protocolOriginal", v)}>Protocol de selecció del donant de teixits entregado</CheckItem>
            </>
          )}

          {step === 6 && (
            <>
              <Header step={6} icon="📁" title="Arxiu i registres" subtitle="Cierre documental y trazabilidad del caso." />
              <HelpBox><b>Archivo físico:</b> adjuntar todas las copias en la carpeta de donaciones situada en el <b>despacho de supervisión de la planta 0</b>.</HelpBox>
              <CheckItem checked={data.step6.copiesDone} onChange={(v) => update("step6", "copiesDone", v)}>Todas las copias de documentos están preparadas</CheckItem>
              <CheckItem checked={data.step6.folderArchived} onChange={(v) => update("step6", "folderArchived", v)}>Documentación archivada en carpeta de donaciones, planta 0</CheckItem>
              <h3 className="pt-2 text-sm font-black uppercase tracking-wide text-slate-500">Registres informàtics</h3>
              <CheckItem checked={data.step6.xhis} onChange={(v) => update("step6", "xhis", v)}>Checklist rellenado correctamente en xHIS</CheckItem>
              <CheckItem checked={data.step6.excel} onChange={(v) => update("step6", "excel", v)}>Excel del centro actualizado</CheckItem>
              <CheckItem checked={data.step6.trello} onChange={(v) => update("step6", "trello", v)}>Trello actualizado</CheckItem>
            </>
          )}

          {step === 7 && (
            <>
              <div className="py-10 text-center">
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-6xl">✅</div>
                <h2 className="mb-3 text-3xl font-black text-slate-950">Procés completat!</h2>
                <p className="leading-relaxed text-slate-600">Gracias por tu trabajo. Has cerrado correctamente el proceso de donación de córnea.</p>
              </div>

              <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {["Documentación completada", "Donor Center contactado", "Número de donant registrado", "Documentación entregada", "Caso registrado y archivado"].map((item) => (
                  <div key={item} className="flex items-center gap-2">✅ {item}</div>
                ))}
              </div>

              <button onClick={reset} className="h-14 w-full rounded-2xl bg-emerald-700 text-base font-black text-white">🔄 Iniciar nou procés</button>
            </>
          )}
        </div>

        {step < 7 && <StickyCallButton urgent={step === 1 && data.step1.hasYesRisk === "SÍ"} />}

        {step < 7 && (
          <div className="grid grid-cols-2 gap-3 p-4 pt-0">
            <button
              disabled={step === 1}
              onClick={() => setStep((current) => Math.max(1, current - 1))}
              className="h-12 rounded-2xl border border-slate-200 bg-white font-black text-slate-700 disabled:opacity-40"
            >
              ← Tornar
            </button>
            <button
              disabled={!canNext}
              onClick={() => setStep((current) => Math.min(7, current + 1))}
              className="h-12 rounded-2xl bg-emerald-700 font-black text-white disabled:bg-slate-300"
            >
              Següent →
            </button>
          </div>
        )}

        <Modal doc={modalDoc} onClose={() => setModalDoc(null)} />
      </div>
    </div>
  );
}

