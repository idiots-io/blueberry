export const changeSettingWithPicker = (type, value) => ({
  type: 'CHANGE_SETTING_WITH_PICKER',
  payload: [type, value],
})

export const toggleAutoStart = value => ({
  type: 'TOGGLE_AUTO_START',
  payload: value,
})
export const toggleSoundMode = value => ({
  type: 'TOGGLE_SOUND_MODE',
  payload: value,
})
