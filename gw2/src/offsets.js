'use strict';

const offsets = {
  WINDOW_NAME: 'Guild Wars 2',
  camera: {
    original: new Buffer([0xFF, 0x50, 0x08, 0x5F, 0x5E, 0x5B, 0x5D, 0xC2, 0x0C, 0x00, 0xFF, 0x75, 0x10]),
    offset: [0xCAFEBABE, 0x1d8, 0x0, 0xec, 0x2b8, 0x0],
    lookAt: {
      x: 0x8,
      y: 0xC,
      z: 0x10
    },
    ortientation: {
      yaw: 0x38,
      roll: 0x3C,
      pitch: 0x5c
    },
    pos: {
      x: 0x20,
      y: 0x24,
      z: 0x28
    },
    unknownPos: {
      x: 0x344,
      y: 0x348,
      z: 0x34C
    },
		upOrDown: 0x38,
    unknown: 0x14,
    maxZoom: 0x1c,
    panZoom: 0x18,
    UnkZoom: 0x90,
    rotation: 0x5c,
    zoom: 0xd4,
    envPointerFix: 0x1C0,
    instructions: {
      // Move this logic to ViewAdvanceWorldView
      coords: 0x657D63, // F3 0F11 5E 20 - movss [esi+20],xmm3
      patch_1: {
        offset: 0x00681EFA,
        original: new Buffer([0xF3, 0x0F, 0x11, 0x76, 0x20, 0xF3, 0x0F, 0x11, 0x6E, 0x24, 0xF3, 0x0F, 0x11, 0x66, 0x28]),
        bytecode: new Buffer([0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90])
      },
      patch_2: {
        offset: 0x00681E28,
        original: new Buffer([0x89, 0x46, 0x20, 0x8B, 0x86, 0xDC, 0x00, 0x00, 0x00, 0x89, 0x46, 0x24, 0x8B, 0x86, 0xE0, 0x00, 0x00, 0x00, 0x89, 0x46, 0x28]),
        bytecode: new Buffer([0x90, 0x90, 0x90, 0x8B, 0x86, 0xDC, 0x00, 0x00, 0x00, 0x90, 0x90, 0x90, 0x8B, 0x86, 0xE0, 0x00, 0x00, 0x00, 0x90, 0x90, 0x90])
      },
      patch_3: {
        offset: 0x00681DC3,
        original: new Buffer([0xF3, 0x0F, 0x11, 0x76, 0x08, 0xF3, 0x0F, 0x11, 0x6E, 0x0C, 0xF3, 0x0F, 0x11, 0x66, 0x10]),
        bytecode: new Buffer([0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90])
      },
      patch_4: {
        offset: 0x00681D1C,
        original: new Buffer([0xF3 ,0x0F ,0x11 ,0x5E ,0x08 ,0xF3 ,0x0F ,0x58 ,0xC7 ,0xF3 ,0x0F ,0x11 ,0x46 ,0x10]),
        bytecode: new Buffer([0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90 ,0x90])
      },
      patch_5: {
        offset: 0x00681AC7,
        original: new Buffer([0x89 ,0x46 ,0x08 ,0x8B ,0x47 ,0x04 ,0x89 ,0x46 ,0x0C ,0x8B ,0x47 ,0x08 ,0x89 ,0x46 ,0x10]),
        bytecode: new Buffer([0x90 ,0x90 ,0x90 ,0x8B ,0x47 ,0x04 ,0x90 ,0x90 ,0x90 ,0x8B ,0x47 ,0x08 ,0x90 ,0x90 ,0x90])
      },
      patch_6: {
        offset: 0x00681C32,
        original: new Buffer([0x89, 0x46, 0x08, 0x8B, 0x47, 0x04, 0x89, 0x46, 0x0C, 0x8B, 0x47, 0x08, 0xBF, 0x01, 0x00, 0x00, 0x00, 0x89, 0x46, 0x10]),
        bytecode: new Buffer([0x90, 0x90, 0x90, 0x8B, 0x47, 0x04, 0x90, 0x90, 0x90, 0x8B, 0x47, 0x08, 0xBF, 0x01, 0x00, 0x00, 0x00, 0x90, 0x90, 0x90])
      },
      patch_7: { // Roll
        offset: 0x00681242,
        original: new Buffer([0xF3, 0x0F, 0x11, 0x56, 0x3C]),
        bytecode: new Buffer([0x90, 0x90, 0x90, 0x90, 0x90])
      }
    }
  },
	debug: {
		original: new Buffer([0x55, 0x8B, 0xEC, 0xF3, 0x0F, 0x10, 0x45, 0x08, 0x81, 0x0D]),
		base: 0x02B41324,
		MapName: 0x0,
		MapNamespace: 0x100,
		MapSector: 0x200,
		MapType: 0x300,
		MapFloor: 0x450,
		MapId: 0x400,
		MapGuid: 0x404
	},
	advancedView: {

	},
  environment: {
		fog: {
			original: new Buffer([0x84, 0x0A, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x76, 0x67]),
			offset: [0xCAFEBABE, 0x0],
			colors: 0xBC,
			colors_b: 0xAC,
			saturation: 0xC8,
			density: 0xf4
            // 0xBC - haze main color
            // 0xAC - haze offset/terrain color (negative)
            // 0xC8 - saturation?
            // 0xF0 - haze density
            // 0xF4 - haze density offset (negative)
		},
    rendering: {
			audio: {
				original: new Buffer([0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x00, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00, 0xFF, 0xB5, 0x60, 0xFF, 0xFF, 0xFF, 0xF3, 0x0F, 0x10, 0x85, 0x5C, 0xFF, 0xFF, 0xFF]),
	      offset: 0x00BF0F00, // MapAudio
	      byteLength: 0x55
	    },
			blocks: {
				original: new Buffer([0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x01, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00, 0xFF, 0xB5, 0x60, 0xFF, 0xFF, 0xFF, 0x8B, 0xC8, 0x8B, 0x10, 0xFF, 0x52, 0x20]),
				offset: 0x00BF0F5A, // MapBlock
				byteLength: 0x23
			},
			decal: {
				original: new Buffer([0xF3, 0x0F, 0x11, 0x8D, 0x64, 0xFF, 0xFF, 0xFF, 0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x05, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00]),
				offset: 0x00BF0F82, // MapDecal
				byteLength: 0x67
			},
			environment: {
				original: new Buffer([0xFF, 0xB5, 0x48, 0xFF, 0xFF, 0xFF, 0x8B, 0x8D, 0x70, 0xFF, 0xFF, 0xFF, 0x8D, 0x95, 0x2C, 0xFF, 0xFF, 0xFF, 0xF3, 0x0F, 0x10, 0x85, 0x78, 0xFF, 0xFF, 0xFF, 0x52]),
				offset: 0x00BF0FEE, // MapEnvironment
				byteLength: 0x38
			},
			river: {
				original: new Buffer([0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x13, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00, 0xF3, 0x0F, 0x10, 0x85, 0x78, 0xFF, 0xFF, 0xFF, 0x51]),
				offset: 0x00BF102B, // MapRiveradvance
				byteLength: 0x5B
			},
			under_water: {
				original: new Buffer([0x8B, 0x8D, 0x48, 0xFF, 0xFF, 0xFF, 0x8D, 0x95, 0x7C, 0xFF, 0xFF, 0xFF, 0xF3, 0x0F, 0x10, 0x85, 0x78, 0xFF, 0xFF, 0xFF, 0x52, 0x8D, 0x95, 0x50, 0xFF, 0xFF, 0xFF, 0x8B, 0x01, 0x52]),
				offset: 0x00BF108B, // MapWaterAdvance
				byteLength: 0x32
			},
			zone: {
				original: new Buffer([0x8B, 0x85, 0x74, 0xFF, 0xFF, 0xFF, 0xF7, 0xD8, 0x6A, 0x1B, 0x1B, 0xC0, 0x83, 0xE0, 0x02, 0x89, 0x85, 0x24, 0xFF, 0xFF, 0xFF, 0x8B, 0x03]),
				offset: 0x00BF10C2, // MapZoneAdvance
				byteLength: 0x37
			},
			lights: {
				original: new Buffer([0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x0A, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00, 0xF3, 0x0F, 0x10, 0x85, 0x6C, 0xFF, 0xFF, 0xFF, 0x8D, 0x8D, 0x2C, 0xFF, 0xFF, 0xFF, 0x83, 0xEC, 0x08]),
				offset: 0x00BF10FE, // MapLights

				byteLength: 0x42
			},
			shadows: {
				original: new Buffer([0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x14, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00, 0x8D, 0x8D, 0x2c, 0xFF, 0xFF, 0xFF, 0x51, 0xFF, 0xB3, 0xB8, 0x00, 0x00, 0x00, 0x8B, 0x10]),
				offset: 0x00BF1145, // MapShadows
				byteLength: 0x2A
			},
			terrain: {
				original: new Buffer([0x8B, 0x8D, 0x68, 0xFF, 0xFF, 0xFF, 0x6A, 0x01, 0xFF, 0xB5, 0x60, 0xFF, 0xFF, 0xFF, 0x8B, 0x01, 0x56, 0x8B, 0xF1, 0xFF, 0x50, 0x14]),
				offset: 0x00BF1174, // MapTrnUpdate
				byteLength: 0x35
			},
			cube_map: {
				original: new Buffer([0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x04, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00, 0xF3, 0x0F, 0x10, 0x85, 0x6C, 0xFF, 0xFF, 0xFF, 0x83, 0xEC, 0x0C, 0x8B, 0xC8]),
				offset: 0x00BF11AE, // MapCubeMapAdvance
				byteLength: 0x44
			},
			props: {
				original: new Buffer([0x8B, 0x03, 0x8B, 0xCB, 0x6A, 0x10, 0xFF, 0x90, 0x98, 0x00, 0x00, 0x00, 0x8B, 0x13, 0x8B, 0xF0, 0x6A, 0x11, 0x8B, 0xCB, 0xFF, 0x92, 0x98, 0x00, 0x00, 0x00]),
				offset: 0x00BF11F7, // MapPropAdvance
				byteLength: 0x5E
			},
      highlight_effect: { // Agent
        original: new Buffer([0x0F, 0x84, 0x07, 0x09, 0x00, 0x00]),
        offset: 0x00ED2E55,
        patch: new Buffer([0xE9, 0x08, 0x09, 0x00, 0x00, 0x90])
      },
      animation: {
  			original: new Buffer([0xF3, 0x0F, 0x10, 0x45, 0x08, 0x83, 0xEC, 0x08, 0xB9, 0x08, 0x00, 0x00, 0x00, 0xF3, 0x0F, 0x11, 0x44, 0x24, 0x04, 0xF3, 0x0F, 0x10, 0x45, 0xFC, 0xF3, 0x0F, 0x11, 0x04, 0x24]),
  			offset: 0x006654B3, // ViewAdvanceModel
  			byteLength: 0x2C
  		}
		},
    timeOfDayOriginal: new Buffer([0xF3, 0x0F, 0x11, 0x8E, 0xCC, 0x19, 0x00, 0x00, 0x5E, 0x5D, 0xC2, 0x04]),
    enableTimeOfDay: 0x00BFE01C, // AFTER THIS -> F3 0F10 05 94220301   - movss xmm0,[Gw2.exe+FF2294]
    timeOfDay: 0x19CC,
    unknown: 0x1A20,
    unknown: 0x214, //Render view distance
    unknown: 0x19D4, //Render view distance
    unknown: 0x049C, //Light lightDir?
    unknown: 0x089C //Blur
  },
  mouse: {
    base: 0x183899C // Mouse x y z on terrain
  },
  player: {
		original: new Buffer([0x08, 0x7B, 0x38, 0x12, 0xF0, 0x7A]),
    pos: {
      offset: [0xCAFEBABE, 0x30, 0x1C, 0x98, 0x0],
      noClip: 0xC8,
      groundLevel: 0xc8,
      x: 0xd0,
      y: 0xd4,
      z: 0xd8
    },
    visualPos: {
      offset: [0xCAFEBABE, 0x30, 0x1c, 0x50, 0xc, 0x0],
      headingA: 0xF0,
      headingB: 0xF4,
      x: 0xC0,
      y: 0xC4,
      z: 0xC8,
      animation: 0x1B4,
      gravity: 0x194,
      isFlying: 0x1d8
    },
    movement: { // View Advance movement
			original: new Buffer([0xF3, 0x0F, 0x10, 0x45, 0x08, 0x51, 0x8B, 0xC8, 0xF3, 0x0F, 0x11, 0x04, 0x24, 0x8B, 0x10, 0xFF, 0x12]),
      offset: 0x0066BF60,
      byteLength: 0x20
    }
  }
};

module.exports = offsets;
