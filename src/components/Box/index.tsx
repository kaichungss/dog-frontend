import React, { ReactNode } from "react";
import styles from "./index.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Box: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className={styles.box}>
      {children}
    </div>
  );
};

export default Box;
