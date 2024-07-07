const sendRefreshToken = async () => {
  try {
    console.log('sendRefreshToken')
    const response = await fetch("http://localhost:3000/refreshTokenRoute", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.status);
  }
};

export default sendRefreshToken;
