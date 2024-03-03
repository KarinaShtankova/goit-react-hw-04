
// Синтаксис імпорту CSS-модуля
import css from "./Alert.module.css";

// Отримуємо об'єкт відповідності імен класів
console.log(css); // { alert: "Alert_alert_ax7yz" }

export const Alert = ({ children }) => {
  // Звертаємось до властивості об'єкта на ім'я класу з файлу CSS-модуля
  return <p className={css.alert}>{children}</p>;
};
