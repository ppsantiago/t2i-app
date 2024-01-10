export const FormField = ({ type, name, placeholder, value, handleChange }) => (
  <div className="w-full flex flex-col">
    <label className="text-sm font-medium text-[#fff]">Buscar...</label>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] focus:text-gray-900 outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
)

export default FormField
