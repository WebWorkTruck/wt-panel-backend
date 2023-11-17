import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { BadApplication } from './dto/bad-application.dto'
import { Category } from './dto/category.dto'
import {
    ApplicationSaleDto,
    CreateSaleDto,
    MoveApplicationSaleDto,
    ReqApplicationSaleDto,
    ReqRefusalDto,
} from './dto/application-sale.dto'

@Injectable()
export class PanelService {
    constructor(private readonly httpService: HttpService) {}

    private ONE_C_URL = 'http://192.168.0.223/test/hs/wt_panel'
    private TYPES = ['Заявка', 'Продажа']

    async getBadApplications(userId: string): Promise<any> {
        const url = '/bad-application'
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.ONE_C_URL + url + '/' + userId)
            )
            const applications: BadApplication[] = response.data
            return applications
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
    async getCategories(userId: string): Promise<any> {
        const url = '/types-application'
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.ONE_C_URL + url + '/' + userId)
            )
            const categories: Category[] = response.data
            return categories
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
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
            console.log(error)

            throw new UnauthorizedException(error.response?.data?.text)
        }
    }

    async moveApplicationSale(
        userId: string,
        body: MoveApplicationSaleDto
    ): Promise<any> {
        const moveApplicationUrl = 'edit-application'
        const moveSaleUrl = 'edit-sale'
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    `${this.ONE_C_URL}/${
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
                    }
                )
            )
            const applicationsAndSales: ApplicationSaleDto = response.data
            return applicationsAndSales
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
    async createSale(body: CreateSaleDto): Promise<any> {
        const createSaleUrl = 'create-sale'

        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.ONE_C_URL}/${createSaleUrl}`, {
                    id: body.id,
                    org: body.org,
                    bill: body.bill,
                })
            )
            const sale: ApplicationSaleDto = response.data
            return sale
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }

    async getOrgsBills(): Promise<any> {
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
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }

    async getCancels(userId: string, query: any): Promise<any> {
        const orgsUrl = `get-cancels/${userId}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${orgsUrl}`)
            )
            const failures: any = response.data
            return failures
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
    async getReturns(userId: string, query: any): Promise<any> {
        const orgsUrl = `list-returns/${userId}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${orgsUrl}`)
            )
            const failures: any = response.data
            return failures
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
    async getMissedCalls(userId: string, query: any): Promise<any> {
        const orgsUrl = `list-returns/${userId}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${orgsUrl}`)
            )
            const failures: any = response.data
            return failures
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }

    async refusalApplication(
        userId: string,
        body: ReqRefusalDto
    ): Promise<any> {
        const refusalUrl = `cancel-application`

        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.ONE_C_URL}/${refusalUrl}`, {
                    id: body.id,
                    person: userId,
                })
            )
            const refusal: any = response.data
            return refusal
        } catch (error) {
            console.log(error)

            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
}
