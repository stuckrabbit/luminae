import FilterHeading from "./FilterHeading";
import styles from "./ColorFilter.module.css";
import { useState } from "react";

interface Props {
    colors: string[],
    onColorSelect: (arg: string[]) => void,
    selectedColors: string[]
}

function ColorFilter(props : Props) {
    const handleColorSelect = (color : string) => {
        if (props.selectedColors.includes(color))
        {
            const newColors = props.selectedColors.filter((item) => item !== color);
            props.onColorSelect(newColors);
        }
        else 
        {
            const newColors = props.selectedColors;
            newColors.push(color);
            props.onColorSelect(newColors);
        }
    }

    return (<div>
        <FilterHeading headingText={"COLOR"}/>
        <div className={styles.contentContainer}>
        {props.colors.map((item) => (<div onClick={() => handleColorSelect(item)} key={item} 
        className={`${styles.colorSelector} ${props.selectedColors.includes(item) && styles.selectedColor} ${item === "#FFFFFF" && styles.whiteColor}`} 
        style={{backgroundColor: `${item}`}}>
                    {props.selectedColors.includes(item) && <p className={styles.checkMark}>&#x2714;</p>}
        </div>))}
        </div>
    </div>);
}

export default ColorFilter;