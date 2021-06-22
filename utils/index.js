export const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((filteredUser) => filteredUser !== userLoggedIn.email)[0];
