import mitt from "mitt";

type Events = {
  updateStorage?: boolean;
  updateFiles?: boolean;
};

const eventBus = mitt<Events>();

export default eventBus;
