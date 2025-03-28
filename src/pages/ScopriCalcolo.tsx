
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator,
  ArrowLeft, 
  Calculator as CalculatorIcon, 
  PlusCircle, 
  ArrowRight, 
  DivideCircle, 
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const ScopriCalcolo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center mb-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna al calcolatore
            </Button>
          </Link>
          
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-tech mr-2" />
            <h1 className="text-3xl font-bold text-foreground">Scopri il calcolo</h1>
          </div>
        </header>
        
        <div className="space-y-10">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Come funziona il calcolo del risparmio</h2>
              <p className="text-muted-foreground mb-6">
                Ecco la spiegazione passo per passo di come calcoliamo il potenziale risparmio passando da abbonamenti a servizi a consumo.
              </p>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">1. Calcolo dei token mensili</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="mb-2">Per ogni ambito di utilizzo selezionato, calcoliamo la media dei token di input e output:</p>
                    <div className="flex flex-col space-y-2 pl-4">
                      <div className="flex items-center">
                        <CalculatorIcon className="h-5 w-5 text-tech mr-2" />
                        <span>Media token input = Somma token input di ogni ambito ÷ Numero di ambiti</span>
                      </div>
                      <div className="flex items-center">
                        <CalculatorIcon className="h-5 w-5 text-tech mr-2" />
                        <span>Media token output = Somma token output di ogni ambito ÷ Numero di ambiti</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">2. Calcolo del numero totale di prompt mensili</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-tech mr-2" />
                      <span>Prompt mensili = Prompt giornalieri × 30 giorni</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">3. Calcolo del costo totale a consumo</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="mb-2">Per ogni modello aggiungiamo:</p>
                    <div className="flex flex-col space-y-3 pl-4">
                      <div className="flex items-center">
                        <CalculatorIcon className="h-5 w-5 text-tech mr-2" />
                        <span>Token input totali = Media token input × Prompt mensili</span>
                      </div>
                      <div className="flex items-center">
                        <CalculatorIcon className="h-5 w-5 text-tech mr-2" />
                        <span>Token output totali = Media token output × Prompt mensili</span>
                      </div>
                      <div className="flex items-center">
                        <PlusCircle className="h-5 w-5 text-tech mr-2" />
                        <span>Costo input = (Token input totali ÷ 1000) × Costo per 1000 token input</span>
                      </div>
                      <div className="flex items-center">
                        <PlusCircle className="h-5 w-5 text-tech mr-2" />
                        <span>Costo output = (Token output totali ÷ 1000) × Costo per 1000 token output</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="h-5 w-5 text-tech mr-2" />
                        <span>Costo totale a consumo = Somma dei costi input e output di tutti i modelli</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">4. Calcolo del costo totale abbonamenti</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-center">
                      <PlusCircle className="h-5 w-5 text-tech mr-2" />
                      <span>Costo totale abbonamenti = Somma del costo mensile di ogni abbonamento selezionato</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">5. Calcolo del risparmio mensile</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-center">
                      <DivideCircle className="h-5 w-5 text-tech mr-2" />
                      <span>Risparmio mensile = Costo totale abbonamenti - Costo totale a consumo</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">6. Calcolo della percentuale di risparmio</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-center">
                      <CalculatorIcon className="h-5 w-5 text-tech mr-2" />
                      <span>Percentuale risparmio = (Risparmio mensile ÷ Costo totale abbonamenti) × 100</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Esempio pratico</h2>
              <p className="mb-4">Immaginiamo un utente che seleziona:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Ambiti di utilizzo:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Scrittura (400 token input, 1200 token output)</li>
                    <li>Programmazione (600 token input, 2500 token output)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Modello selezionato:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>GPT-4o con 20 prompt al giorno</li>
                    <li>Costo: €0,005 per 1000 token input, €0,015 per 1000 token output</li>
                    <li>Abbonamento: ChatGPT Plus (€20/mese)</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Calcolo:</h3>
                  <div className="bg-muted p-4 rounded-md space-y-4">
                    <div>
                      <p className="font-medium">1. Media token:</p>
                      <ul className="list-disc pl-6">
                        <li>Media token input = (400 + 600) ÷ 2 = 500 token</li>
                        <li>Media token output = (1200 + 2500) ÷ 2 = 1850 token</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">2. Prompt mensili:</p>
                      <ul className="list-disc pl-6">
                        <li>20 × 30 = 600 prompt/mese</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">3. Token totali:</p>
                      <ul className="list-disc pl-6">
                        <li>Token input totali = 500 × 600 = 300.000 token</li>
                        <li>Token output totali = 1850 × 600 = 1.110.000 token</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">4. Costo a consumo:</p>
                      <ul className="list-disc pl-6">
                        <li>Costo input = (300.000 ÷ 1000) × €0,005 = €1,50</li>
                        <li>Costo output = (1.110.000 ÷ 1000) × €0,015 = €16,65</li>
                        <li>Costo totale = €1,50 + €16,65 = €18,15/mese</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">5. Risparmio:</p>
                      <ul className="list-disc pl-6">
                        <li>Risparmio mensile = €20 - €18,15 = €1,85/mese</li>
                        <li>Percentuale risparmio = (€1,85 ÷ €20) × 100 = 9,25%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/">
            <Button className="bg-tech hover:bg-tech-dark text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna al calcolatore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScopriCalcolo;
