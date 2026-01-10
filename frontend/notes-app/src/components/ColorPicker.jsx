const ColorPicker = ({ selectedColor, onColorChange }) => {
    const colors = ['#FFD88A', '#FF9B9B', '#B8A0E8', '#61DAFB', '#D4F88A'];

    return (
        <div className="flex gap-2 mb-4">
            {colors.map(color => (
                <button
                    key={color}
                    onClick={() => onColorChange(color)}
                    className="w-8 h-8 rounded-full border-2 transition-all"
                    style={{
                        backgroundColor: color,
                        borderColor: selectedColor === color ? '#333' : 'transparent',
                        transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)'
                    }}
                />
            ))}
        </div>
    );
};

export default ColorPicker;
