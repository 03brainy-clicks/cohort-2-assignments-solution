import axios from "axios";

export const fetchUserDetails = async (auth, setUser) => {
  try {
    const response = await axios.get(
      `https://paytm-clone-backend-production.up.railway.app/api/users/${auth.userId}`,
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    setUser(response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const fetchAccountBalance = async (auth) => {
  try {
    const response = await axios.get(
      "https://paytm-clone-backend-production.up.railway.app/api/account/balance",
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user account:", error);
    throw error;
  }
};

export const fetchUsers = async (auth) => {
  try {
    const response = await axios.get(
      "https://paytm-clone-backend-production.up.railway.app/api/users/",
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users :", error);
    throw error;
  }
};

export const fetchTransactions = async (auth) => {
  try {
    const response = await axios.get(
      "https://paytm-clone-backend-production.up.railway.app/api/account/transactions",
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    return response.data.transactions;
  } catch (error) {
    console.error("Error fetching user account:", error);
    throw error;
  }
};
