
export default function getClientId() {
    let clientId = localStorage.getItem('id');

    if (!clientId) {
      clientId = crypto.randomUUID();
      localStorage.setItem('id', clientId);
    }

    return clientId;
}