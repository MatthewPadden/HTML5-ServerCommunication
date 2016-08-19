using System;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.WebSockets;

namespace WebSockets.Controllers
{
    public class WsChatController : ApiController
    {
        /* The initial request (handshake) is a HTTP GET, after that the rest of the communication is over the Web Sockets protocol. The client
         * uses the "Upgrade: WebSocket" and "Connection: Upgrade" headers to say it wants to use Web Sockets. If the server supports Web Sockets
         * it replies with the same "Upgrade: WebSocket" and "Connection: Upgrade" headers (completing the handshake) and the connection is established */

        public HttpResponseMessage Get()
        {
            // is the request for web socket?
            if (HttpContext.Current.IsWebSocketRequest)
                // accept the web socket request and process with ProcessWsChat()
                HttpContext.Current.AcceptWebSocketRequest(ProcessWsChat);

            // return 101 (Switching Protocols)
            return new HttpResponseMessage(HttpStatusCode.SwitchingProtocols);
        }

        // Echos back the message from the client along with the current time
        private static async Task ProcessWsChat(AspNetWebSocketContext context)
        {
            var socket = context.WebSocket;
            while (true)
            {
                var buffer = new ArraySegment<byte>(new byte[1024]);
                var result = await socket.ReceiveAsync(buffer, CancellationToken.None);

                if (socket.State == WebSocketState.Open)
                {
                    var userMessage = Encoding.UTF8.GetString(buffer.Array, 0, result.Count);
                    userMessage = $"You sent: {userMessage} at {DateTime.Now.ToLongTimeString()}";

                    buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(userMessage));
                    await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                }
                else
                    break;
            }
        }
    }
}
