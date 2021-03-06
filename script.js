// create checkbox list of all members.

if (localStorage.getItem('officeMembersArray')) {
    officeMembers = JSON.parse(localStorage.getItem('officeMembersArray'));
} else {
    localStorage.setItem('officeMembersArray', JSON.stringify(officeMembers));
}

const memberSelectionArea = document.getElementById('checkbox-area');
for (const member of officeMembers) {
    const checkboxLabel = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.id = member;
    checkbox.value = member;
    checkbox.innerText = member;
    checkbox.checked = JSON.parse(window.localStorage.getItem(member));
    checkboxLabel.addEventListener('change', (e) => {
        window.localStorage.setItem(e.target.value, e.target.checked);
    })
    checkboxLabel.addEventListener('dblclick', (e) => {
        const isConfirmed = confirm(`Are you sure you want to delete ${e.target.innerText}?`);
        if (isConfirmed) {
            removeMember(e);
        }
    })
    checkboxLabel.setAttribute("for", checkbox.id);
    checkboxLabel.innerText = member;
    checkboxLabel.for = checkbox.id;
    memberSelectionArea.append(checkboxLabel);
    checkboxLabel.appendChild(checkbox);
}

function removeMember(e) {
    removeFromArray(e.target.innerText);
    localStorage.setItem('officeMembersArray', JSON.stringify(officeMembers));
    localStorage.removeItem(e.target.innerText);
    e.target.previousElementSibling.remove();
    e.target.remove();
}

function removeFromArray(target) {
    for (let i = 0; i < officeMembers.length; i++) {
        if (officeMembers[i] === target) {
            officeMembers.splice(i, 1);
        }
    }
}

// logic to choose presenter.
const getPresenter = () => {
    const members = [...document.getElementsByTagName('input')];
    const nextPresenter = document.getElementById("answer");
    const checkedMembers = members.filter(ciandtier => ciandtier.checked === true);
    if (checkedMembers.length <= 1) {
        isSelected = false;
    }
    if (checkedMembers.length <= 0) {
        nextPresenter.innerHTML = 'Please select some speakers.';
        return;
    }
    const random = Math.floor(Math.random() * checkedMembers.length);
    const selectedMember = checkedMembers.splice(random, 1)[0];
    nextPresenter.innerHTML = selectedMember.value;
    selectedMember.checked = false;
    window.localStorage.setItem(nextPresenter.innerHTML, false);
}

const button = document.getElementById("random");

button.addEventListener("click", function () {
    getPresenter();
    defineBackgroundColor();
})

function defineBackgroundColor() {
    let backgroundColor = document.body;
    let red = Math.floor(Math.random() * 195) + 60;
    let green = Math.floor(Math.random() * 195) + 60;
    let blue = Math.floor(Math.random() * 195) + 60;
    backgroundColor.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}

// Logic to select and deselect all people.
const selectDeselectAll = document.getElementById('select-deselect');
let isSelected = false;

selectDeselectAll.addEventListener('click', function () {
    const allTeam = [...document.getElementsByTagName('input')];
    for (const member of allTeam) {
        if (isSelected) {
            member.checked = false;
            window.localStorage.setItem(member.value, false);
        } else {
            member.checked = true;
            window.localStorage.setItem(member.value, true);
        }
    }
    isSelected = !isSelected;
})
