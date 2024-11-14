const Input = ({ type = "text", placeholder = "", value, onChange, style}) => {
  
    const baseStyle = {
        padding: '0.5rem 0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '0.25rem',
        outline: 'none', 
        width: '100%'
    };

    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        style={{ ...baseStyle, ...style }}
    />
    </div>
    );
};

export default Input;
