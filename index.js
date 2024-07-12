// third-party libraries and codes
const formatter = (data) => {
    return {
        day: {
            numeric: (dayjs(data).format('DD')),
            week: {
                short: (dayjs(data).format('ddd')),
                complete: (dayjs(data).format('dddd'))
            }
        },
        month: (dayjs(data).format('MMMM')),
        hour: (dayjs(data).format('HH:mm')),
        defaultSystem: (dayjs(data).format('YYYY-MM-DD HH:mm'))
    }
}

// codes
const activity = {
    name: "Almoço",
    date: new Date("2024-07-08 10:00"),
    completed: false
}

let activities = [
    activity,
    {
        name: "Academia em grupo",
        date: new Date("2024-07-09 10:00"),
        completed: false
    },
    {
        name: "Gaming Section",
        date: new Date("2024-07-07 10:00"),
        completed: false
    }
]

//activities = [];

const createActivityItem = (activity) => {

    let input = `<input type="checkbox" onchange="completeActivity(event)" value="${activity.date}" name="" id="" `;

    if(activity.completed){
        input += 'checked';
    }

    input += '>';

    const format = formatter(activity.date);

    return `
        <div>
            ${input}
            <span>${activity.name}</span>
            <time datetime="${format.defaultSystem}">
            ${format.day.week.complete}, 
            dia ${format.day.numeric}
            de ${format.month}
            às ${format.hour}h</time>
        </div>
        `
}

const updateActivitiesList = () => {
    const section = document.querySelector('section');
    section.innerHTML = '';

    if(activities.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
        return;
    }

    for(let activity of activities) {
        section.innerHTML += createActivityItem(activity);
    }
}
updateActivitiesList()

const saveActivity = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get('activity');
    const day = formData.get('day');
    const hour = formData.get('hour');
    const date = `${day} ${hour}`;

    const newActivity = {
        name,
        date,
        completed: false
    }
    
    const existActivity = activities.find((activity) => {
        return activity.date == newActivity.date;
    });
    
    if(existActivity) {
        return alert('Dia/Hora não disponível!');
    }
    
    activities = [newActivity, ...activities];
    updateActivitiesList()
}

const createSelectionDays = () => {
    const days = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03"
    ]

    let selectionDays = '';

    for(let day of days){
        const format = formatter(day);
        const formattedDay = `
        ${format.day.numeric} de
        ${format.month}
        `;

        selectionDays += `
        <option value="${day}">${formattedDay}</option>
        `;
    }

    document.querySelector('select[name="day"]').innerHTML = selectionDays;
}
createSelectionDays();

const createSelectionHour = () => {
    let availableHours = '';

    for(let i = 6; i < 23; i++) {
        const hour = String(i).padStart(2, '0');
        availableHours += `<option value="${hour}:00">${hour}:00</option>`;
        availableHours += `<option value="${hour}:30">${hour}:30</option>`;
    }

    document.querySelector('select[name="hour"]').innerHTML = availableHours;
}
createSelectionHour();

const completeActivity = (event) => {
    const input = event.target;
    const inputDate = input.value;

    const activity = activities.find((activity) => {
        return activity.date == inputDate;
    });

    if(!activity) {
        return
    }

    activity.completed = !activity.completed;
}