type TCheckBoxProps = {
  checked: boolean;
  label: string;
  handleChecked: () => void;
};

export const CheckBox = ({ checked, label, handleChecked }: TCheckBoxProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={handleChecked}
      />
      <label htmlFor="checkbox">{label}</label>
    </div>
  );
};
