﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SignalR.Startup))]

namespace SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}
