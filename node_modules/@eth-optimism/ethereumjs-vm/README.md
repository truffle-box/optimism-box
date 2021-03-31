# ethereumjs-ovm

Implements Optimism's OVM in Javascript. Forked with <3 from `ethereumjs-vm`!

## Logging

This fork provides some custom logging tools for introspecting the OVM via the `debug` package. Particularly, the environment variable `DEBUG='ethjs-ovm:interpreter` will allow you to log various degrees of internal EVM execution such as calls, stack, and memory.
You must also add `DEBUG_OVM=true` to enable debugging.
The logging namespace includes the start and ending bytes of the address and the call depth (e.g. `js-ovm:intrp:0xdeadde..ad0005:d5`)

Available namespaces are:

- All OVM debug logging (warning, lots of logs): `DEBUG='*'`
- Call logging: `DEBUG='*:calls` (recommended to run first)
- Step logging: `DEBUG='*:calls:steps` (recommended to run filtered by address, e.g. `DEBUG='*:calls,js-ovm:intrp:0xdeadde..ad0005:d2:calls:steps'`)
- Memory logging: `DEBUG=*:calls:memory` (recommended to run filtered by address, see above)

Or mix and match any of the above to get your desired logging level.

# LICENSE

[MPL-2.0](https://www.mozilla.org/MPL/2.0/)
