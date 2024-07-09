const activity = {
    name: "Almoço",
    date: new Date("2014-07-07 10:00"),
    completed: false
}

const activities = [
    activity,
    {
        name: "Academia em grupo",
        date: new Date("2014-07-07 10:00"),
        completed: false
    },
    {
        name: "Gaming Section",
        date: new Date("2014-07-07 10:00"),
        completed: false
    }
];

const createActivityItem = (activity) => {

    let input = '<input type="checkbox" name="" id="" ';

    if(activity.completed){
        input += 'checked';
    }

    input = input + '>'

    return `
        <div>
            ${input}
            <span>${activity.name}</span>
            <time datetime="2024-04-18 08:00">${activity.date}</time>
        </div>
        `
};

const section = document.querySelector('section');

for(let activity of activities) {
    section.innerHTML += createActivityItem(activity);
}

