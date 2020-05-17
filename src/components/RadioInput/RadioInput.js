import React from "react";
import cn from "classnames";
import './RadioInput.css';

export const RadioGroup = ({
	name,
	label,
	children,
	direction = "vertical",
}) => {
	return (
		<fieldset
			className={cn("a11y", "radioGroup", {
				[`radioGroup--horizontal`]: direction === "horizontal",
			})}
		>
			{label && <legend className={"radioGroup__label"}>{label}</legend>}
			<div className="radioGroup__buttons">
				{React.Children.map(children, (radioButton) =>
					React.isValidElement(radioButton)
						? React.cloneElement(radioButton, {
								name,
						  })
						: null
				)}
			</div>
		</fieldset>
	);
};

export const RadioInput = ({
	name,
	label,
	value,
	checked,
	onSelect,
	color
}) => {
	return (
		<label
			className={cn({
				"radioButton": true,
				"radioButton--selected": checked,
				[`radioButton--${color}`]: color,
			})}
		>
			<input
				onChange={(event) =>
					event.currentTarget.checked &&
					typeof onSelect !== "undefined" &&
					onSelect(event)
				}
				type={"radio"}
				name={name}
				value={value}
				checked={checked}
			/>
			<span className={"radioButton__indicator"} />
			{label}
		</label>
	);
};