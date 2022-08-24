import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const StudentCard = () => {
    const [card, setCard] = useState();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("card"));
        if (data) setCard(data);
    }, []);

    const history = useHistory();

    const handleEdit = () => {
        history.push("/edit", card);
    };

    const renderAge = (year) => {
        const age = new Date().getFullYear() - Number(year);
        const lastOne = Number(age.toString().slice(-1));
        if (age > 4 && age < 15) {
            return age + " лет";
        }
        if (lastOne === 1) return age + " год";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return age + " года";
        return age + " лет";
    };

    const renderContent = () => {
        return card
            ? <>
                <p><b>Имя: </b>{card.name}</p>
                <p><b>Фамилия: </b>{card.surname}</p>
                <p><b>Год рождения: </b>{card.year} ({renderAge(card.year)})</p>
                <p><b>Портфолио: </b><a href={card.portfolio} target="_blank" rel="noreferrer">{card.portfolio}</a></p>
                <button className="btn btn-primary" onClick={handleEdit}>Редактировать</button>
            </>
            : <>
                <p>Нет данных</p>
                <button className="btn btn-primary" onClick={handleEdit}>Создать</button>
            </>;
    };

    return <div>
        <h1 className="mb-3">Карточка студента</h1>
        {renderContent()}
    </div>;
};

export default StudentCard;
