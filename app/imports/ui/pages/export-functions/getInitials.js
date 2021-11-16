export const getInitials = (name) => {

    // if the name given was only a first or last
    if (name.length === 1) {
        return name[0].toUpperCase();
    }

    const newName = name.split(' ');
    const firstName = newName[0];
    const firstInitial = firstName[0];
    const lastName = newName[1];
    const lastInitial = lastName[0];
    return firstInitial.toUpperCase() + lastInitial.toUpperCase();
};

// testing for names that include both firstname and lastname
// console.log(getInitials('my dude'));
