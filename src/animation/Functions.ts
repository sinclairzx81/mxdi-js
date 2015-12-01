/*--------------------------------------------------------------------------

acid-js - multimedia web stuff

The MIT License (MIT)

Copyright (c) 2015 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

/// <reference path="../typings.ts" />

module acid.animation {
	/** 
     * lerp: lerps a single numberic value.
     */
    export function lerp(src: number, dst: number, amount: number) {
        var delta = dst - src;
        return src + (delta * amount)
    }
	/** 
     * lerp2: lerps a THREE.Vector2 value.
     */    
    export function lerp2(src: THREE.Vector2, dst: THREE.Vector2, amount: number) {
        var delta = new THREE.Vector2(dst.x - src.x, 
                                      dst.y - src.y)   
        return new THREE.Vector3(src.x + (delta.x * amount),
                                 src.y + (delta.y * amount));
    } 
          
	/** 
     * lerp3: lerps a THREE.Vector3 value.
     */    
    export function lerp3(src: THREE.Vector3, dst: THREE.Vector3, amount: number) {
        var delta = new THREE.Vector3(dst.x - src.x, 
                                      dst.y - src.y, 
                                      dst.z - src.z) 
        if(amount == NaN) {
            throw Error("ok")
        }  
        return new THREE.Vector3(src.x + (delta.x * amount),
                                 src.y + (delta.y * amount),
                                 src.z + (delta.z * amount));
    }    
}