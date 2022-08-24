import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import TextField from "./textField";
import { validator } from "../utils/validator";

const EditCard = ({ card }) => {
    const [data, setData] = useState(card || {
        name: "",
        surname: "",
        year: "",
        portfolio: ""
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;
    const isTouched = _.isEqual(card, data);
    const history = useHistory();

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        surname: {
            isRequired: {
                message: "Фамилия обязательна для заполнения"
            }
        },
        year: {
            isRequired: {
                message: "Год обязателен для заполнения"
            },
            isDigit: {
                message: "Год должен содержать только цифры"
            },
            max: {
                message: "Год должен содержать не больше 4-х цифр",
                value: 4
            },
            isValidYear: {
                message: "Год не может быть больше текущего",
                value: new Date().getFullYear()
            }
        },
        portfolio: {
            isRequired: {
                message: "Ссылка на портфолио обязательна"
            },
            isValidUrl: {
                message: "Неверный формат ссылки"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = ({ target }) => {
        setData(prevData => ({ ...prevData, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            localStorage.setItem("card", JSON.stringify(data));
            window.alert("Обновлено!");
            history.replace("/card");
        };
    };

    const handleGoBack = () => {
        history.push("/card");
    };

    return <>
        <h1 className="mb-3">{card ? "Редактировать" : "Создать"}</h1>
        <form onSubmit={handleSubmit}>
            <TextField
                name="name"
                label="Имя"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />

            <TextField
                name="surname"
                label="Фамилия"
                id="surname"
                value={data.surname}
                onChange={handleChange}
                error={errors.surname}
            />

            <TextField
                // chrome позволяет писать запятую и точку, ошибку не выводит при type="number"
                type="text"
                label="Год рождения"
                name="year"
                value={data.year}
                onChange={handleChange}
                error={errors.year}
            />

            <TextField
                type="text"
                label="Портфолио"
                name="portfolio"
                value={data.portfolio}
                onChange={handleChange}
                error={errors.portfolio}
            />
            {card && <button className="btn btn-secondary" type="button" onClick={handleGoBack}>Назад</button>}
            <button className="btn btn-primary mx-2" disabled={!isValid || isTouched}>{card ? "Обновить" : "Создать"}</button>
        </form>
    </>;
};

EditCard.propTypes = {
    card: PropTypes.object
};

export default EditCard;
