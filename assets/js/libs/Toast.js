class Toast {
  constructor(props) {
    const { toastId } = props;
    this.toastBody = document.getElementById(toastId);
    this.toastBootstrap = null;

    this.initialize();
  }

  initialize() {
    this.toastBootstrap = bootstrap.Toast.getOrCreateInstance(this.toastBody);
  }

  show() {
    this.toastBootstrap.show();
  }
}

export default Toast;
