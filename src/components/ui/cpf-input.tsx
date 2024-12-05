const CpfInput = ({ value, onChange }) => {
  const formatCpf = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleChange = (e) => {
    const formattedValue = formatCpf(e.target.value);
    onChange(formattedValue);
  };

  return (
    <input
      type="text"
      name="cpf"
      value={value}
      onChange={handleChange}
      maxLength={14}
      placeholder="Digite o CPF"
      className="mt-1 block w-full px-3 py-2 border rounded-md"
    />
  );
};

export default CpfInput;
