
/*
 * This file was automatically generated by witx-codegen - Do not edit manually.
 */

export type WasiHandle = i32;
export type Char8 = u8;
export type Char32 = u32;
export type WasiPtr<T> = usize;
export type WasiMutPtr<T> = usize;
export type WasiStringBytesPtr = WasiPtr<Char8>;

@unmanaged
export class WasiString {
    ptr: WasiStringBytesPtr;
    length: usize;

    constructor(str: string) {
        let wasiString = String.UTF8.encode(str, false);
        // @ts-ignore: cast
        this.ptr = changetype<WasiStringBytesPtr>(wasiString);
        this.length = wasiString.byteLength;
    }

    toString(): string {
        let tmp = new ArrayBuffer(this.length as u32);
        memory.copy(changetype<usize>(tmp), this.ptr, this.length);
        return String.UTF8.decode(tmp);
    }
}

@unmanaged
export class WasiSlice<T> {
    ptr: WasiPtr<T>;
    length: usize;

    constructor(array: ArrayBufferView) {
        // @ts-ignore: cast
        this.ptr = array.dataStart;
        this.length = array.byteLength;
    }
}

@unmanaged
export class WasiMutSlice<T> {
    ptr: WasiMutPtr<T>;
    length: usize;

    constructor(array: ArrayBufferView) {
        // @ts-ignore: cast
        this.ptr = array.dataStart;
        this.length = array.byteLength;
    }
}

/**
 * ---------------------- Module: [wasi_experimental_http] ----------------------
 */

export type HttpError = u32;

export namespace HttpError {
    export const SUCCESS: HttpError = 0;
    export const INVALID_HANDLE: HttpError = 1;
    export const MEMORY_NOT_FOUND: HttpError = 2;
    export const MEMORY_ACCESS_ERROR: HttpError = 3;
    export const BUFFER_TOO_SMALL: HttpError = 4;
    export const HEADER_NOT_FOUND: HttpError = 5;
    export const UTF_8_ERROR: HttpError = 6;
    export const DESTINATION_NOT_ALLOWED: HttpError = 7;
    export const INVALID_METHOD: HttpError = 8;
    export const INVALID_ENCODING: HttpError = 9;
    export const INVALID_URL: HttpError = 10;
    export const REQUEST_ERROR: HttpError = 11;
    export const RUNTIME_ERROR: HttpError = 12;
    export const TOO_MANY_SESSIONS: HttpError = 13;
}

/**
 * HTTP status code
 */
export type StatusCode = u16;

/**
 * An HTTP body being sent
 */
export type OutgoingBody = WasiSlice<u8>;

/**
 * Buffer for an HTTP body being received
 */
export type IncomingBody = WasiMutSlice<u8>;

/**
 * A response handle
 */
export type ResponseHandle = WasiHandle;

/**
 * Buffer to store a header value
 */
export type HeaderValueBuf = WasiMutSlice<u8>;

/**
 * Number of bytes having been written
 */
export type WrittenBytes = usize;

/**
 * Send a request
 */
// @ts-ignore: decorator
@external("wasi_experimental_http", "req")
export declare function req(
    url_ptr: WasiPtr<Char8>,
    url_len: usize,
    method_ptr: WasiPtr<Char8>,
    method_len: usize,
    headers_ptr: WasiPtr<Char8>,
    headers_len: usize,
    body_ptr: WasiPtr<u8>,
    body_len: usize,
    result_0_ptr: WasiMutPtr<StatusCode>,
    result_1_ptr: WasiMutPtr<ResponseHandle>
): HttpError;

/**
 * Close a request handle
 */
// @ts-ignore: decorator
@external("wasi_experimental_http", "close")
export declare function close(
    response_handle: ResponseHandle
): HttpError;

/**
 * Get the value associated with a header
 */
// @ts-ignore: decorator
@external("wasi_experimental_http", "header_get")
export declare function headerGet(
    response_handle: ResponseHandle,
    header_name_ptr: WasiPtr<Char8>,
    header_name_len: usize,
    header_value_buf_ptr: WasiMutPtr<u8>,
    header_value_buf_len: usize,
    result_ptr: WasiMutPtr<WrittenBytes>
): HttpError;

/**
 * Get the entire response header map
 */
// @ts-ignore: decorator
@external("wasi_experimental_http", "headers_get_all")
export declare function headersGetAll(
    response_handle: ResponseHandle,
    header_value_buf_ptr: WasiMutPtr<u8>,
    header_value_buf_len: usize,
    result_ptr: WasiMutPtr<WrittenBytes>
): HttpError;

/**
 * Fill a buffer with the streamed content of a response body
 */
// @ts-ignore: decorator
@external("wasi_experimental_http", "body_read")
export declare function bodyRead(
    response_handle: ResponseHandle,
    body_buf_ptr: WasiMutPtr<u8>,
    body_buf_len: usize,
    result_ptr: WasiMutPtr<WrittenBytes>
): HttpError;
