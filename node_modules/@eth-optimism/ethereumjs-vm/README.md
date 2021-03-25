# ethereumjs-ovm

Implements Optimism's OVM in Javascript. Forked with <3 from `ethereumjs-vm`!

## Logging

This fork provides some custom logging tools for introspecting the OVM via the `debug` package. Particularly, the environment variable `DEBUG='ethjs-ovm:interpreter` will allow you to log various degrees of internal EVM execution such as calls, stack, and memory.

Available namespaces are:

- All OVM debug logging (warning, lots of logs): `DEBUG='ethjs-ovm:interpreter:*'`
- Call logging: `DEBUG='ethjs-ovm:interpreter:calls`
- Step logging: `DEBUG='ethjs-ovm:interpreter:calls:steps`
- Memory logging: `DEBUG='ethjs-ovm:interpreter:calls:memory`

Or mix and match any of the above to get your desired logging level.

# LICENSE

[MPL-2.0](https://www.mozilla.org/MPL/2.0/)
