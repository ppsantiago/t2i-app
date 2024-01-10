import { useState, useEffect } from "react"
import ShareIcon from "@mui/icons-material/Share"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { CircularIndeterminate } from "./AnimationLoader"
import { Auth, db, storage } from "../conf/firebajse-config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { collection, addDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

const API_TOKEN = "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"

export const imageGenerationForm = () => {
  useEffect(() => {
    console.log("")
  }, [])

  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState(null)
  const [prompt, setPrompt] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [user] = useAuthState(Auth)
  const postRef = collection(db, "posts")

  const uploadImage = async () => {
    if (imageFile !== null) {
      const imageRef = ref(storage, `images/${imageFile.name + v4()}`)
      uploadBytes(imageRef, imageFile)
        .then(() => {
          getDownloadURL(imageRef).then((url) => {
            if (prompt !== "") {
              addDoc(postRef, {
                prompt: prompt,
                image: url,
                user: user.displayName,
                logo: user.photoURL,
              })
                .then(() => alert("posted"))
                .catch((err) => console.log(err))
            }
          })
        })
        .catch((err) => console.log(err))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const input = event.target.elements.input.value
    setPrompt(input)
    const response = await fetch(
      // "https://api-inference.huggingface.co/models/stabilityai/runwayml/stable-diffusion-v1-5",
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      // "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      // "https://api-inference.huggingface.co/models/dataautogpt3/OpenDalleV1.1",
      // "https://api-inference.huggingface.co/models/dataautogpt3/OpenDalle", - Works
      // "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", //Works
      // "https://api-inference.huggingface.co/models/thibaud/sdxl_dpo_turbo",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to generate image")
    }

    const blob = await response.blob()
    setOutput(URL.createObjectURL(blob))
    setImageFile(new File([blob], "art.png", { type: "image/png" }))
    setLoading(false)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = output
    link.download = "art.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="mx-10">
      <div>
        <h1 className="font-extrabold text-[#fff] text-[32px]">
          Describe tu idea
        </h1>
      </div>
      <form className="generate-form mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="Describe tu idea aqui..."
        />

        <button type="submit" className="button">
          Generar
        </button>
      </form>
      {loading && (
        <div className="loading w-full flex flex-col justify-center ">
          <CircularIndeterminate />
        </div>
      )}
      {!loading && output && (
        <div className="result-image">
          <img src={output} alt="art" />
          <div className="action">
            <button onClick={handleDownload}>
              <FileDownloadIcon />
              Download
            </button>
            {user && (
              <button onClick={uploadImage}>
                <ShareIcon />
                Share
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default imageGenerationForm
