const FormmatSelector = () => {
  return (
    <div className="format__selector">
      <label htmlFor="format">Formato:</label>
      <select id="format" name="format">
        <option value="2D">2D</option>
        <option value="3D">3D</option>
        <option value="IMAX">IMAX</option>
        <option value="4DX">4DX</option>
      </select>
    </div>
  );
};

export default FormmatSelector;
