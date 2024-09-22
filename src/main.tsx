import ReactDOM from "react-dom/client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { defaultLang, languages } from "@excalidraw/excalidraw";
import './main.css'
import { useEffect, useState } from "react";
import { locale } from '@tauri-apps/api/os';


function Main() {
  const [lang, setLang] = useState(defaultLang.code);

  useEffect(() => {
    locale().then(
      loc => {
        console.log(loc)
        if (loc && languages.findIndex(l => l.code === loc) !== -1) {
          setLang(loc)
      }
    })

  }, [])

  return (
    <div style={{ height: "100vh", width: '100vw' }}>
      <Excalidraw langCode={lang} />
    </div>
  )
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />
);
