export default ({ name, closeOnDestroy = false }) => {
  const openModalNames = useState("openModalNames", () => ({}));

  const open = () => {
    try {
      openModalNames.value[name] = true;
    } catch (error) {
      console.error(error);
    }
  };

  const close = () => {
    try {
      openModalNames.value[name] = false;
    } catch (error) {
      console.error(error);
    }
  };

  const toggle = () => {
    try {
      openModalNames.value[name] = !openModalNames.value[name];
    } catch (error) {
      console.error(error);
    }
  };

  onUnmounted(() => {
    try {
      document.body.style = "overflow:auto";
      if (closeOnDestroy) {
        close();
      }
    } catch (error) {
      console.error(error);
    }
  });

  onBeforeUnmount(() => {
    try {
      if (closeOnDestroy) {
        const pre = {};
        Object.entries(openModalNames.value).forEach(([key, value]) => {
          if (key !== name) {
            pre[key] = value;
          }
        });
        document.body.style = "overflow:auto";
        openModalNames.value = {};
      }
    } catch (error) {
      console.error(error);
    }
    document.body.style = "overflow:auto";
  });

  const isOpen = computed(() => {
    return openModalNames.value[name];
  });

  return { openModalNames, isOpen: isOpen, close, open, toggle };
};
