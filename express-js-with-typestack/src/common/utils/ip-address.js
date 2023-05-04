import { hostname, networkInterfaces, platform, type, userInfo, version } from 'os';

/**
 * os 모듈로 서버가 실행되는 os 환경의 ip 주소를 가져옵니다.
 *
 * - 현재 지원되는 os
 * |Windows|MacOs|
 * |-|-|
 * |Wi-Fi|이더넷|
 * |Wi-Fi|이더넷|
 */
export class IpAddress {
  /**
   * 현재 OS의 정보를 가져옵니다.
   */
  static get osInfo() {
    return {
      hostname: hostname(),
      platform: platform(),
      type: type(),
      userInfo: userInfo(),
      version: version(),
    };
  }

  /**
   * 현재 OS의 IP 주소를 가져옵니다.
   */
  static get current() {
    const ifaces = networkInterfaces();
    let ip = '';
    Object.keys(ifaces).forEach(key => {
      ifaces[key]?.forEach(details => {
        if (
          (key.indexOf('Wi-Fi') !== -1 || // windows
            key.indexOf('이더넷') !== -1 || // windows
            key.indexOf('en6') !== -1 || // macOS 이더넷
            key.indexOf('en0') !== -1) && // macOS Wi-Fi
          details.family === 'IPv4'
        ) {
          ip = details.address;
        }
      });
    });
    return ifaces.hasOwnProperty('Wi-Fi') ||
      ifaces.hasOwnProperty('이더넷') ||
      ifaces.hasOwnProperty('en6') ||
      ifaces.hasOwnProperty('en0')
      ? ip
      : 'localhost';
  }
}
