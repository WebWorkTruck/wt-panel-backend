import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Cache } from 'cache-manager'
import * as sharp from 'sharp'

@Injectable()
export class TimeControlService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    private TIME_CONTROL_URL = process.env.TIME_CONTROL_URL
    private TC_LOGIN = '123'
    private TC_PASS = '123'
    private TC_AUTH_TOKEN = btoa(`${this.TC_LOGIN}:${this.TC_PASS}`)

    async getAvatarByUserId(userId: string): Promise<any> {
        const url = 'persons/getfoto?userid='

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.TC_AUTH_TOKEN}`,
        }

        const avatar = await this.cacheManager.get(userId)
        if (avatar) return avatar

        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.TIME_CONTROL_URL}/${url}${userId}`,
                    {
                        headers,
                        responseType: 'arraybuffer', // Ожидаем бинарные данные
                    }
                )
            )

            const avatarData: Buffer = Buffer.from(response.data)

            const compressedAvatarData = await sharp(avatarData)
                .webp({ quality: 20 })
                .toBuffer()

            const base64Image = compressedAvatarData.toString('base64')

            await this.cacheManager.set(userId, base64Image, 0)

            return base64Image
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении аватара пользователя (TimeControl) - ${error.response.data.error}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getInfoUser(userId: string) {
        const url = `persons?tabnum=${userId}`

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.TC_AUTH_TOKEN}`,
        }

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.TIME_CONTROL_URL}/${url}`, {
                    headers,
                })
            )

            const userData: any = response.data

            return userData.data[0].UID
        } catch (error) {
            console.log(error)

            console.log(
                `🆘🆘🆘 Ошибка при получении информации о пользователе (TimeControl) - ${error.response?.data?.error}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getTimeWorkUser(userId: string, startDate: string, endDate: string) {
        const url = `time/works?startdate=${startDate}&enddate=${endDate}&person_list=${userId}`

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.TC_AUTH_TOKEN}`,
        }

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.TIME_CONTROL_URL}/${url}`, {
                    headers,
                })
            )

            const timeWorks = response.data

            let totalWorkHours = 0
            const workTimes = [] // массив будет содержать объекты со стартовым и конечным временем
            let absencesCount = 0
            let lateArrivalsCount = 0
            let overtimesCount = 0

            timeWorks.data.forEach(record => {
                if (record.DAYTYPE === '0') {
                    totalWorkHours += parseInt(record.FACT_MIN_WORK) || 0

                    const startTime = record.FACT_START_TIME.split(' ')[1] // Получаем "9:00:00" из "23.10.2023 9:00:00"
                    const endTime = record.FACT_END_TIME.split(' ')[1] // Получаем "18:00:00" из "23.10.2023 18:00:00"

                    workTimes.push({
                        day: record.WORKDATE,
                        startTime: startTime,
                        endTime: endTime,
                    })

                    // Дополнительные проверки отсутствия и т.д.
                    if (record.PROGUL !== '0') absencesCount++
                    if (record.OPOZD !== '0') lateArrivalsCount++
                    if (record.ZADERJ !== '0') overtimesCount++
                }
            })

            // Итоговые данные
            const result = {
                workDaysCount: timeWorks.record_count,
                totalWorkHours: totalWorkHours / 60, // переводим минуты в часы
                workTimes, // массив с датами и временем
                absencesCount,
                lateArrivalsCount,
                overtimesCount,
            }

            return result
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении времени работы пользователя (TimeControl) - ${error.response.data.error}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
