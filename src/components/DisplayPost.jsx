/* eslint-disable react/prop-types */

export const DisplayPost = (props) => {
  const { logo, image, prompt, user, id } = props.post

  return (
    <div
      className="rounded-xl group relative shadow-card hover:shadow-cardhover card"
      key={id}
    >
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={image}
        alt={prompt}
      />

      <div
        className={
          "group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#fff] m-2 p-4 rounded-md"
        }
      >
        <div className="">
          <img className="logo mr-2" src={logo ? logo : deflogo} alt={prompt} />
          <div>
            <span
              style={{
                color: "#888",
                fontSize: "12px",
                textTransform: "lowercase",
              }}
            >
              {user}
            </span>
            <p style={{ fontSize: "14px" }}>{prompt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayPost
