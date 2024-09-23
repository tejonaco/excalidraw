import ReactDOM from "react-dom/client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { defaultLang, languages } from "@excalidraw/excalidraw";
import './main.css'
import { useCallback, useEffect, useState } from "react";
import { locale } from '@tauri-apps/plugin-os';
import { getMatches } from '@tauri-apps/plugin-cli';
import { readTextFile } from "@tauri-apps/plugin-fs";
import { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types";


function Main() {
  const [lang, setLang] = useState(defaultLang.code);

  async function load() {

    // set locale language
    const localeLang = await locale()
    if (localeLang && languages.findIndex(l => l.code === localeLang) !== -1) {
      setLang(localeLang)
    }
  }

  const readFile = useCallback(async function() {
    const matches = await getMatches()
    const file = matches.args.file

    if (file.value && typeof file.value === 'string') {
      const data: ExcalidrawInitialDataState = JSON.parse(await readTextFile(file.value))

      data.scrollToContent = true

      return data
    } else {
      return null
    }
  }, [])


  useEffect(() => {
    load()
  }, []) 


  return (
    <div style={{ height: "100vh", width: '100vw' }}>
      <Excalidraw langCode={lang} initialData={readFile()} />
    </div>
  )
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />
);
