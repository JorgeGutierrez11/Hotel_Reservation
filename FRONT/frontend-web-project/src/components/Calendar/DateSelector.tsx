import dayjs, { Dayjs } from "dayjs";
import { Calendar } from "./Calendar";

interface DateSelectorProps {
  startValue: Dayjs | null;
  endValue: Dayjs | null;
  setStartValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  setEndValue:  React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  blockedDates: Dayjs[];
}

export const DateSelector = ({
  startValue,
  endValue,
  setStartValue,
  setEndValue,
  blockedDates,
}: DateSelectorProps) => {
  return (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }} className="content-calendar">
      <div className="calendar1">
        <h4>Fecha de Inicio</h4>
        <Calendar
          blockedDates={blockedDates}
          value={startValue}
          setValue={setStartValue}
        />
      </div>
      <div className="calendar2">
        <h4>Fecha de Fin</h4>
        <Calendar
          blockedDates={blockedDates}
          value={endValue}
          setValue={setEndValue}
          minDate={startValue} // para evitar seleccionar fin antes del inicio
        />
      </div>
    </div>
  );
};
