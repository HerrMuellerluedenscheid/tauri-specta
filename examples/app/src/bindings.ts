/* eslint-disable */
// This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

/** user-defined commands **/


export const commands = {
/**
 * HELLO
 * WORLD
 * !!!!
 */
async helloWorld(myName: string) : Promise<string> {
    return await TAURI_INVOKE("hello_world", { myName });
},
async goodbyeWorld() : Promise<string> {
    return await TAURI_INVOKE("goodbye_world");
},
async hasError() : Promise<Result<string, number>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("has_error") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async someStruct() : Promise<MyStruct> {
    return await TAURI_INVOKE("some_struct");
},
async generic() : Promise<void> {
    await TAURI_INVOKE("generic");
},
/**
 * @deprecated This is a deprecated function
 */
async deprecated() : Promise<void> {
    await TAURI_INVOKE("deprecated");
},
async typesafeErrorsUsingThiserror() : Promise<Result<null, MyError>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("typesafe_errors_using_thiserror") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async typesafeErrorsUsingThiserrorWithValue() : Promise<Result<null, MyError2>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("typesafe_errors_using_thiserror_with_value") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
}
}

/** user-defined events **/


export const events = __makeEvents__<{
demoEvent: DemoEvent,
emptyEvent: EmptyEvent
}>({
demoEvent: "demo-event",
emptyEvent: "empty-event"
})

/** user-defined constants **/

export const universalConstant = 42 as const;

/** user-defined types **/

export type Custom = string
export type DemoEvent = string
export type EmptyEvent = null
export type MyError = { type: "IoError" } | { type: "AnotherError"; data: string }
export type MyError2 = { type: "IoError"; data: string }
export type MyStruct = { some_field: string }

/** tauri-specta globals **/

import {
	invoke as TAURI_INVOKE,
	Channel as TAURI_CHANNEL,
} from "@tauri-apps/api/core";
import * as TAURI_API_EVENT from "@tauri-apps/api/event";
import { type WebviewWindow as __WebviewWindow__ } from "@tauri-apps/api/webviewWindow";

type __EventObj__<T> = {
	listen: (
		cb: TAURI_API_EVENT.EventCallback<T>,
	) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
	once: (
		cb: TAURI_API_EVENT.EventCallback<T>,
	) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
	emit: T extends null
		? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit>
		: (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};

export type Result<T, E> =
	| { status: "ok"; data: T }
	| { status: "error"; error: E };

function __makeEvents__<T extends Record<string, any>>(
	mappings: Record<keyof T, string>,
) {
	return new Proxy(
		{} as unknown as {
			[K in keyof T]: __EventObj__<T[K]> & {
				(handle: __WebviewWindow__): __EventObj__<T[K]>;
			};
		},
		{
			get: (_, event) => {
				const name = mappings[event as keyof T];

				return new Proxy((() => {}) as any, {
					apply: (_, __, [window]: [__WebviewWindow__]) => ({
						listen: (arg: any) => window.listen(name, arg),
						once: (arg: any) => window.once(name, arg),
						emit: (arg: any) => window.emit(name, arg),
					}),
					get: (_, command: keyof __EventObj__<any>) => {
						switch (command) {
							case "listen":
								return (arg: any) => TAURI_API_EVENT.listen(name, arg);
							case "once":
								return (arg: any) => TAURI_API_EVENT.once(name, arg);
							case "emit":
								return (arg: any) => TAURI_API_EVENT.emit(name, arg);
						}
					},
				});
			},
		},
	);
}
