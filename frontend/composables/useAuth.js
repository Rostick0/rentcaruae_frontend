import auth from "~/api/modules/auth";

export default async () => {
  const accessToken = useCookie("accessToken", {
    maxAge: 60 * 60 * 24 * 7,
  });
  const user = useState("user", () => null);

  const setUser = (resp) => {
    user.value = resp?.user;
    accessToken.value = resp?.token;
  };

  const login = async (data, isRedirect = true) => {
    try {
      const resp = await auth.login(data);
      // if (resp?.error) resp?.popup();
      if (resp?.error) {
        return resp?.errorResponse?.data;
      }
      setUser(resp);
      if (isRedirect) {
        navigateTo({ name: "index" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (data, isRedirect = true) => {
    try {
      const resp = await auth.register(data);
      // if (resp?.error) resp?.popup();
      if (resp?.error) {
        return resp?.errorResponse?.data;
      }
      setUser(resp);
      if (isRedirect) {
        navigateTo({ name: "index" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      await auth
        .me(
          //   {
          //     // extends:
          //     //   "contacts,country,image,flat_owners.user,alert,collection_relats.collection",
          //   },
          {},
          { Authorization: `Bearer ${accessToken.value}` }
        )
        .then((resp) => {
          if (!resp?.error && resp) {
            user.value = resp;
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = (
    params
    // options?: NavigateToOptions | undefined
  ) => {
    accessToken.value = null;
    user.value = null;
    if (params) {
      navigateTo(params);
    } else {
      navigateTo("/login");
    }
  };
  
  // if (accessToken.value && !user.value) {
  //   await getUser();
  // }
  return {
    accessToken,
    user,
    login,
    register,
    getUser,
    logout,
  };
};