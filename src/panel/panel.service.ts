import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { BadApplication } from './dto/bad-application.dto'
import { Category } from './dto/category.dto'
import {
    ApplicationSaleDto,
    MoveApplicationSaleDto,
    ReqApplicationSaleDto,
    ReqRefusalDto,
} from './dto/application-sale.dto'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ReqGetDeliveryInfo } from './dto/delivery-info'
import { ReqCreateCheck, ReqGetCheck } from './dto/check.dto'

@Injectable()
export class PanelService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    private ONE_C_URL = process.env.URL_ONE_C
    private TYPES = ['Заявка', 'Продажа']

    async getBadApplications(userId: string) {
        const url = '/bad-application'
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.ONE_C_URL + url + '/' + userId)
            )
            const applications: BadApplication[] = response.data
            return applications
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении bad-applications - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getCategories(userId: string) {
        const url = `${this.ONE_C_URL}/types-application/${userId}`
        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const categories: Category[] = response.data
            return categories
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении категорий - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getApplicationSale(
        userId: string,
        query: ReqApplicationSaleDto
    ): Promise<ApplicationSaleDto> {
        const listSaleUrl = 'list-sale'
        const listApplicationsUrl = 'list-application'
        const applicationsAndSAles = 'application-and-sale'
        try {
            if (query.title === 'Все') {
                const response = await firstValueFrom(
                    this.httpService.get(
                        `${this.ONE_C_URL}/${applicationsAndSAles}/${userId}/${
                            query.page
                        }/${query.count}/${query.text ? query.text : 'false'}`
                    )
                )
                const sales: ApplicationSaleDto = response.data
                return sales
            }
            if (query.type === this.TYPES[0]) {
                const response = await firstValueFrom(
                    this.httpService.get(
                        `${this.ONE_C_URL}/${listApplicationsUrl}/${userId}/${query.page}/${query.count}/${query.title}`
                    )
                )
                const sales: ApplicationSaleDto = response.data
                return sales
            }
            if (query.type === this.TYPES[1]) {
                const response = await firstValueFrom(
                    this.httpService.get(
                        `${this.ONE_C_URL}/${listSaleUrl}/${userId}/${query.page}/${query.count}/${query.title}`
                    )
                )
                const applicationsAndSales: ApplicationSaleDto = response.data
                return applicationsAndSales
            }
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении заявок или продаж - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async moveApplicationSale(userId: string, body: MoveApplicationSaleDto) {
        const moveApplicationUrl = `${this.ONE_C_URL}/edit-application`
        const moveSaleUrl = `${this.ONE_C_URL}/edit-sale`
        let title_for_commen: string

        if (body.comment_for_collector.length > 0) {
            title_for_commen = 'Комметарий во время сборки'
        }

        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    `${
                        body.type === this.TYPES[0]
                            ? moveApplicationUrl
                            : body.type === this.TYPES[1]
                              ? moveSaleUrl
                              : ''
                    }`,
                    {
                        id: body.id,
                        person: body.move_myself ? userId : '0',
                        processing: body.processing,
                        sub_processing: body.sub_processing,
                        description:
                            title_for_commen + body.comment_for_collector,
                    }
                )
            )

            const applicationsAndSales: ApplicationSaleDto = response.data
            return applicationsAndSales
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении перемещении зявки или продажи - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getOrgsBills() {
        const orgsUrl = 'list-organizations'
        const billsUrl = 'list-bills'

        try {
            const orgsResponse = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${orgsUrl}`)
            )
            const billsResponse = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${billsUrl}`)
            )
            const orgs: any = orgsResponse.data
            const bills: any = billsResponse.data
            return { orgs, bills }
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении Организаций и Счетов - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getCancels(userId: string, query: any) {
        const orgsUrl = `get-cancels/${userId}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${orgsUrl}`)
            )
            const failures: any = response.data
            return failures
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении отклонённых заявок - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getReturns(userId: string, query: any) {
        const orgsUrl = `list-returns/${userId}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${orgsUrl}`)
            )
            const failures: any = response.data
            return failures
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении возвратных заявок - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getMissedCalls(userId: string, query: any) {
        const orgsUrl = `list-returns/${userId}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${orgsUrl}`)
            )
            const failures: any = response.data
            return failures
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении пропущенных звонков - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async refusalApplication(userId: string, body: ReqRefusalDto) {
        const refusalUrl = `cancel-application`

        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.ONE_C_URL}/${refusalUrl}`, {
                    id: body.id,
                    person: userId,
                    description: 'Комментарий при отказе:' + body.reason,
                })
            )
            const refusal: any = response.data
            return refusal
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении отклонённых заявок - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getDeliveryInfo(query: ReqGetDeliveryInfo) {
        const deliveryInfoUrl = `get-delivery-info`

        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.ONE_C_URL}/${deliveryInfoUrl}/${query.id}`
                )
            )
            const refusal: any = response.data
            return refusal
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении информации о тк для продажи - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getTkCities() {
        const tkCities = await this.cacheManager.get('tk-cities')
        if (tkCities) {
            console.log('from-cache')

            return tkCities
        }
        const tkCitiesUrl = `get-list-info`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${tkCitiesUrl}`)
            )
            await this.cacheManager.set(
                'tk-cities',
                response.data,
                1000 * 60 * 60 * 24
            )
            console.log('from-1c')

            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении информации о городах и тк - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getCheck(query: ReqGetCheck) {
        const getCheckUrl = `get-check`

        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.ONE_C_URL}/${getCheckUrl}/${query.id}`
                )
            )

            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении информации счёте - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async createCheck(body: ReqCreateCheck) {
        const createCheckUrl = 'create-check'

        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    `${this.ONE_C_URL}/${createCheckUrl}/${body.id}`,
                    {
                        org: body.org,
                        bill: body.bill,
                    }
                )
            )
            const sale: string = response.data
            return sale
        } catch (error) {
            console.log(error)

            console.log(
                `🆘🆘🆘 Ошибка при создании счёта - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
