import { ApiProperty } from '@nestjs/swagger'

class Tks {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}

class Countries {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}
class Regions {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}
class Cities {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}

class TkCities {
    @ApiProperty({ type: [Tks] })
    tks: Tks[]
    @ApiProperty({ type: [Countries] })
    countries: Countries[]
    @ApiProperty({ type: [Regions] })
    regions: Regions[]
    @ApiProperty({ type: [Cities] })
    cities: Cities[]
}
class DeliveryInfoAppSale {
    @ApiProperty()
    id: string
    @ApiProperty()
    date: string
    @ApiProperty()
    client: string
    @ApiProperty()
    status: string
    @ApiProperty()
    statushistory: string
    @ApiProperty()
    sending_city: string
    @ApiProperty()
    receipt_country: string
    @ApiProperty()
    receipt_region: string
    @ApiProperty()
    receipt_city: string
    @ApiProperty()
    delivery_status: string
    @ApiProperty()
    driver: string
    @ApiProperty()
    inn: string
    @ApiProperty()
    passport: string
    @ApiProperty()
    registration: string
    @ApiProperty()
    delivery_client: string
    @ApiProperty()
    name_or_name: string
    @ApiProperty()
    private: string
    @ApiProperty()
    weight: string
    @ApiProperty()
    sum: string
    @ApiProperty()
    tk: string
}

export class DeliveryInfoRes {
    @ApiProperty({ type: TkCities })
    tkCities: TkCities
    @ApiProperty({ type: DeliveryInfoAppSale })
    deliveryInfo: DeliveryInfoAppSale
}

export class ReqGetDeliveryInfo {
    @ApiProperty()
    id: string
}
