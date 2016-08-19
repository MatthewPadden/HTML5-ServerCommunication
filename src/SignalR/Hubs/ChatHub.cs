using Microsoft.AspNet.SignalR;

namespace SignalR.Hubs
{
    public class ChatHub : Hub
    {
        // This just takes the name and message and relays it to everyone else. The data is not persisted anywhere
        public void Send(string name, string message)
        {
            // call the broadcastMessage method to update clients
            Clients.All.broadcastMessage(name, message);
        }
    }
}