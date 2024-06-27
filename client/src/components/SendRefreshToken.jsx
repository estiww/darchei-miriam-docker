const sendRefreshToken = async () => {
  try {
    const response = await fetch("http://localhost:3000/refreshTokenRoute", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendRefreshToken;
