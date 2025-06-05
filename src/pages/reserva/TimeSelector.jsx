const TimeSelector = () => {
 return (
    <div className="time-selector">
      <label htmlFor="time">Hora:</label>
      <select id="time" name="time">
        <option value="10:00">10:00</option>
        <option value="12:00">12:00</option>
        <option value="14:00">14:00</option>
        <option value="16:00">16:00</option>
        <option value="18:00">18:00</option>
        <option value="20:00">20:00</option>
      </select>
    </div>
 )
}

export default TimeSelector;