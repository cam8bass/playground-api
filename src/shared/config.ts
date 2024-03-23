interface ConfigInterface {
  timeout: number
}

const config: ConfigInterface = {
  /**
   * @description The timeout in milliseconds to use for requests.
   * @type {number}
   */
  timeout: 5000
}

export default config
