import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../conf/firebajse-config"
import DisplayPost from "./DisplayPost"
import { CircularIndeterminate } from "./AnimationLoader"
// import { CircularIndeterminate } from "./AnimationLoader"
import FormField from "./FormField"

export const Home = () => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  const postRef = collection(db, "posts")

  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState(null)

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = posts.filter(
          (item) =>
            item.user.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        )
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  useEffect(() => {
    setLoading(true)
    const getPost = () => {
      getDocs(postRef).then((data) => {
        setPost(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
        setLoading(false)
      })
    }
    getPost()
  }, [])

  return (
    <section className="max-full px-32 mx-30px-auto pt-16 flex justify-center items-center flex-col">
      <div>
        <h2 className="font-extrabold text-[#fff] text-[32px]">
          Generados por la comunidad
        </h2>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Busca por palabra clave los diseños que han sido generados por la
          comunidad.
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Escribe lo que buscas"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="w-full flex flex-col justify-center items-center my-20">
            <CircularIndeterminate />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Resiltados para:{" "}
                <span className="text-[#fff]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText && searchedResults
                ? searchedResults.map((post) => (
                    <DisplayPost post={post} key={post.id} />
                  ))
                : posts.map((post) => (
                    <DisplayPost post={post} key={post.id} />
                  ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
